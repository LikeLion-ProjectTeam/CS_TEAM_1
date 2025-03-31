import os
import json
from django.http import JsonResponse
from serpapi import GoogleSearch
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv

load_dotenv()  

@csrf_exempt
def search_google(request):
    if request.method == 'GET':
        query = request.GET.get("q")
        if not query:
            return JsonResponse({"error": "Missing query parameter"}, status=400)

        params = {
            "engine": "google",
            "q": query,
            "location": "United States",
            "hl": "en",
            "gl": "us",
            "api_key": os.getenv("SERPAPI_KEY")
        }

        try:
            search = GoogleSearch(params)
            results = search.get_dict()
            top_results = results.get("organic_results", [])[:3]

            formatted = [{"title": r["title"], "link": r["link"]} for r in top_results]

            os.makedirs("public", exist_ok=True)
            with open("public/results.json", "w", encoding="utf-8") as f:
                json.dump(formatted, f, ensure_ascii=False, indent=2)

            return JsonResponse(formatted, safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "GET request required"}, status=405)
