from django.urls import path
from .views import search_google

urlpatterns = [
    path("search/", search_google),
]