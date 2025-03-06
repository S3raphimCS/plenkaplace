from rest_framework import serializers

from server.apps.news.models import News, NewsImage


class NewsImageSiteSerializer(serializers.ModelSerializer):
    """Сериализатор для модели изображений к новостям."""

    class Meta:
        model = NewsImage
        fields = ("image",)


class NewsListSerializer(serializers.ModelSerializer):
    """Сериализатор для модели новостей."""

    class Meta:
        model = News
        fields = ("id", "title", "preview",)


class NewsDetailSerializer(serializers.ModelSerializer):
    """Сериализатор для модели новостей."""

    images = NewsImageSiteSerializer(many=True, read_only=True)

    class Meta:
        model = News
        fields = "__all__"
