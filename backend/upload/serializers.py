from rest_framework import serializers
from .models import Images, Theme, Tags, Vectors
from .fields import SVGAndImageFormField


class TagsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tags
        fields = ('tag')


class ThemeSerializer(serializers.ModelSerializer):

    class Meta:
        model: Theme
        fields = ('name')


class VectorsSerializer(serializers.ModelSerializer):
    vectors = serializers.ImageField(_DjangoImageField=SVGAndImageFormField)

    class Meta:
        model = Vectors
        fields = ('vector', 'id')


class ImagesSerializer(serializers.ModelSerializer):
    tags_list = TagsSerializer(many=True, read_only=True)

    class Meta:
        model = Images
        fields = ('theme', 'image', 'thumbnail', 'vector',
                  'caption', 'date_created', 'contributor', 'status', 'tags', 'id')

    def create(self, validated_data):
        tags_list = validated_data.pop('tags_list')
        image = Images.objects.create(**validated_data)
        # Does Vectors also need to be validated here?
        image.tags_list.add(*tags_list)
        return image
