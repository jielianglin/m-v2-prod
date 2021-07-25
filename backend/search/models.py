from django.db import models
from django_filters import rest_framework as filters
from upload import models


class ImagesFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='iexact')

    class Meta:
        model = models.Images
        fields = ['tags', 'themes']
