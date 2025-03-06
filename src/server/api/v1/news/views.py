from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions
from rest_framework.viewsets import ReadOnlyModelViewSet

from server.api.v1.core.pagination.base import StandardPagePagination
from server.api.v1.news.serializers import NewsDetailSerializer, NewsListSerializer
from server.apps.news.models import News


class NewsViewSet(ReadOnlyModelViewSet):
    """Вью сет для просмотра новостей"""

    queryset = News.published_objects.all().order_by("-published_date")
    serializer_class = NewsListSerializer
    permission_classes = (permissions.AllowAny,)
    pagination_class = StandardPagePagination
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    ordering_fields = ("published_date",)
    search_fields = ("title",)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return NewsDetailSerializer

        return self.serializer_class
