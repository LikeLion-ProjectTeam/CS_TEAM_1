# backend/search_results/urls.py

from django.urls import path
from .views import search_results, search_google

urlpatterns = [
    path('results/', search_results, name='search_results'),  # 기존 검색 API
    path('search/', search_google, name='search_google'),     # 새로 만든 Scraper API
]
