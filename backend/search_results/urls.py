from django.urls import path
from .views import TagSearchView

urlpatterns = [
    path('search/<str:tag>/', TagSearchView.as_view(), name='tag_search'),
]