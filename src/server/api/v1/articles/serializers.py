from rest_framework import serializers

from server.apps.articles.models import Article, ArticleImage


class ArticleImageSiteSerializer(serializers.ModelSerializer):
    """Сериализатор для изображения в статьях."""

    class Meta:
        model = ArticleImage
        fields = ("file",)


class ArticleDetailSiteSerializer(serializers.ModelSerializer):
    """Сериализатор для статей."""

    images = ArticleImageSiteSerializer(read_only=True, many=True)

    class Meta:
        model = Article
        fields = '__all__'


class ArticleSiteListSerializer(serializers.ModelSerializer):
    """Сериализатор для статей."""

    class Meta:
        model = Article
        fields = ("id", "title", "preview",)
