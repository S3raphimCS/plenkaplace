from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from server.api.v1.core.pagination.base import StandardPagePagination
from server.api.v1.shop.filters import ProductFilter
from server.api.v1.shop.serializers import (
    DeliveryMethodSerializer,
    OrderSerializer,
    ProductSerializer,
    ProductTypeSerializer,
)
from server.apps.shop.models import DeliveryMethod, Order, Product, ProductType


class DeliveryMethodViewSet(mixins.ListModelMixin, GenericViewSet):
    """Вьюсет просмотра списка способов доставки."""
    pagination_class = StandardPagePagination
    serializer_class = DeliveryMethodSerializer
    queryset = DeliveryMethod.objects.all()


class ProductTypeViewSet(mixins.ListModelMixin, GenericViewSet):
    """Вьюсет просмотра списка категорий товаров."""
    pagination_class = StandardPagePagination
    serializer_class = ProductTypeSerializer
    queryset = ProductType.objects.all()


class ProductViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    filter_backends = [DjangoFilterBackend]
    pagination_class = StandardPagePagination
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(is_available=True)
    filterset_class = ProductFilter

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return self.queryset.none()

        qs = self.queryset.all()
        return qs


class OrderViewSet(mixins.CreateModelMixin, GenericViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_throttles(self):
        if self.action == 'create':
            self.throttle_scope = 'order.create'
        return super().get_throttles()