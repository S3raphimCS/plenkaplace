from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.viewsets import ReadOnlyModelViewSet

from server.api.v1.articles.serializers import (
    ArticleDetailSiteSerializer,
    ArticleSiteListSerializer,
)
from server.api.v1.core.pagination.base import StandardPagePagination
from server.apps.articles.models import Article


class ArticleSiteViewSet(ReadOnlyModelViewSet):
    """Вьюсет для просмотра статей"""

    queryset = Article.published_objects.all().order_by('-published_date')
    serializer_class = ArticleSiteListSerializer
    pagination_class = StandardPagePagination
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    ordering_fields = ("published_date",)
    search_fields = ("title", "text",)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ArticleDetailSiteSerializer

        return self.serializer_class
