import os
import json
from django.db.models import Q
from django.core.paginator import Paginator
from django.http import JsonResponse
from serpapi import GoogleSearch
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from datetime import date
from .models import SearchResult

# .env 파일 로드
load_dotenv()

# --- 검색 결과 조회 API ---
def search_results(request):
    keyword = request.GET.get('keyword', '')    # 유저 입력 검색어
    field = request.GET.get('field', 'all')     # 검색 범위
    hashtags = request.GET.getlist('hashtags')  # 해시태그 필터
    start_date = request.GET.get('start_date')  # 시작 날짜
    end_date = request.GET.get('end_date')      # 끝 날짜
    page = request.GET.get('page', 1)           # 페이지

    query = Q()

    if keyword:
        if field == 'title':
            query &= Q(title__icontains=keyword)
        elif field == 'summary':
            query &= Q(summary__icontains=keyword)
        elif field == 'tags':
            query &= Q(tags__contains=[keyword])
        else:
            query &= (
                Q(title__icontains=keyword) |
                Q(summary__icontains=keyword) |
                Q(tags__contains=[keyword]) |
                Q(state__icontains=keyword)
            )

    if hashtags:
        hashtag_query = Q()
        for tag in hashtags:
            hashtag_query |= (
                Q(title__icontains=tag) |
                Q(summary__icontains=tag) |
                Q(tags__contains=[tag])
            )
        query &= hashtag_query

    if start_date and end_date:
        query &= Q(publish_date__range=[start_date, end_date])

    results = SearchResult.objects.filter(query).order_by('-publish_date')
    paginator = Paginator(results, 10)
    paginated_results = paginator.get_page(page)

    data = [{
        'title': result.title,
        'summary': result.summary,
        'source_url': result.source_url,
        'publish_date': result.publish_date.strftime('%Y-%m-%d'),
        'tags': result.tags,
    } for result in paginated_results]

    return JsonResponse({
        'results': data,
        'has_next': paginated_results.has_next()
    })

# --- 구글 검색 후 DB 저장 API ---
@csrf_exempt
def search_google(request):
    if request.method == 'GET':
        query = request.GET.get("q")
        if not query:
            return JsonResponse({"error": "Missing query parameter"}, status=400)

        params = {
            "engine": "google",
            "q": query,
            "location": "California, United States", # CA로 설정 - for testing
            "hl": "en",
            "gl": "us",
            "api_key": os.getenv("SERPAPI_KEY")
        }

        try:
            search = GoogleSearch(params)
            results = search.get_dict()
            top_results = results.get("organic_results", [])[:1] # 1개만 저장 - for testing

            for r in top_results:
                title = r.get("title")
                link = r.get("link")
                snippet = r.get("snippet", "") # 구글에 나온 summary
                
                # tags 생성
                tags = query.lower().split()

                SearchResult.objects.create(
                    title=title,
                    state="California", 
                    summary=snippet,
                    source_url=link,
                    publish_date=date.today(),
                    tags=tags
                )

            return JsonResponse({"message": "Title scraped and saved to DB!"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "GET request required"}, status=405)