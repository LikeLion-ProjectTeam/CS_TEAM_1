from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SearchResult
from .serializers import SearchResultSerializer

class TagSearchView(APIView):
    def get(self, request, tag):
        results = SearchResult.objects.filter(tags__contains=[tag])
        serializer = SearchResultSerializer(results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)