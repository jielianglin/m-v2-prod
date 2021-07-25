from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ImagesSerializer
from .models import Images


class ImagesViewSet(viewsets.ModelViewSet):
    serializer_class = ImagesSerializer
    query_set = Images.objects.all()
