import os
from datetime import datetime, date
from dotenv import load_dotenv
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from serpapi import GoogleSearch

from ..models import SearchResult
from .tagging import extract_tags, classify_category  # 태그/카테고리 분류 함수

load_dotenv()


# ─────────────────────────────────────────────────────────────
# [search_google]
# SerpAPI를 통해 구글 검색 수행
# 결과를 태그, 카테고리 자동 분류 후 DB에 저장
# URL: /api/search-google/?q=검색어
# 사용 목적: 크롤링 기반 초기 데이터 구축 
# ─────────────────────────────────────────────────────────────
@csrf_exempt
def search_google(request):
    if request.method == 'GET':
        # 쿼리 파라미터에서 검색어 받기
        query = request.GET.get("q")
        if not query:
            return JsonResponse({"error": "Missing query parameter"}, status=400)

        # SerpAPI 설정
        params = {
            "engine": "google",                          # 검색 엔진 종류
            "q": query,                                  # 검색어
            "location": "Wisconsin, United States",     # 위치 기반 결과 (임시 고정)
            "hl": "en",                                  # 언어 (영어)
            "gl": "us",                                  # 국가 코드
            "api_key": "" # 자기 serpapi api_key " " 사이에 넣기!
        }

        try:
            # SerpAPI를 통해 검색 수행
            search = GoogleSearch(params)
            results = search.get_dict()
            # print("SerpAPI 응답 keys:", results.keys())
            
            # 검색 결과 중 상위 1개만 추출 (for testing)
            top_results = results.get("organic_results", [])[:5]

            # 검색 결과 없을 경우, return
            if not top_results:
                print("검색 결과 없음! 저장 생략")
                return JsonResponse({"message": "No results from SerpAPI"}, status=204)

            for r in top_results:
                title = r.get("title")          # 제목
                link = r.get("link")            # 원문 링크
                snippet = r.get("snippet", "")  # 요약
                date_str = r.get("date")        # 게시일 (ex: 'Apr 17, 2025')

                print("저장 시도:", title, link)

                # 제목이나 링크 빠져있으면 저장 안 함
                if not title or not link:
                    print("필수 정보(제목, 링크) 누락. 저장 안 함")
                    continue

                # 본문 기반 텍스트 정리 및 분석
                text = f"{title} {snippet}".lower()
                matched_tags = extract_tags(text)  # 키워드 매칭 (tagging.py)
                category = classify_category(text) # 카테고리 추론 (tagging.py)

                # 게시일 처리 (ex: 'Apr 17, 2025' -> datetime.date)
                try:
                    publish_date = datetime.strptime(date_str, "%b %d, %Y").date() if date_str else date.today()
                except Exception:
                    publish_date = date.today()

                state = "Wisconsin" # 현재는 고정값

                # 검색(scraping)한 결과 최종 DB 저장
                SearchResult.objects.create(
                    title=title,
                    category=category,
                    state=state,
                    summary=snippet,
                    source_url=link,
                    publish_date=publish_date,
                    tags=matched_tags
                )

                print("저장 완료:", title)

            return JsonResponse({"message": "Scraped and Saved in DB!"}, status=201)

        except Exception as e:
            print("예외 발생:", str(e))
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "GET request required"}, status=405)
