from django.shortcuts import render
from upload import models as Images
from upload.models import Images
from upload.serializers import ImagesSerializer
from django_filters import rest_framework as filters
from rest_framework import views


class ImagesListViewSet(views.ModelViewSet):
    queryset = Images.objects.all()
    serializer_class = ImagesSerializer
    filter_backends = (filters.DjangoFilterBackend)
    filterset_fields = ('tags', 'themes')
    search_fields = ('tags', 'themes')

    def get_queryset(self):
        # project_id: Which arguement should be passed in?
        return self.queryset \
            .filter(project_id=self.kwargs.get('project_id')) \
