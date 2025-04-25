from django.urls import path
from .views.search import TagSearchView, multi_filter_search
from .views.scraping import search_google

urlpatterns = [
    path('search/<str:tag>/', TagSearchView.as_view(), name='tag_search'),  # 단일 태그
    path('search/', multi_filter_search, name='multi_filter_search'),       # 다양한 필터 검색
    path('search-google/', search_google, name='search_google'),            # 구글 크롤링
]
