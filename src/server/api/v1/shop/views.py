from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.filters import OrderingFilter
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ViewSet

from server.api.v1.core.pagination.base import StandardPagePagination
from server.api.v1.shop.filters import ProductFilter
from server.api.v1.shop.serializers import (
    BrandSerializer,
    DeliveryMethodSerializer,
    OrderSerializer,
    ProductSerializer,
    ProductTypeSerializer,
    PromoCodeCheckSerializer,
)
from server.apps.shop.models import (
    Brand,
    DeliveryMethod,
    Order,
    Product,
    ProductType,
    PromoCode,
)


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
    """Вьюсет просмотра товаров."""
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    pagination_class = StandardPagePagination
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(is_available=True)
    filterset_class = ProductFilter

    ordering_fields = ["price", "title", "created_at"]
    ordering = ["-created_at"]

    lookup_field = 'slug'

    def get_object(self):
        if 'pk' in self.kwargs:
            self.lookup_field = 'id'
            self.lookup_url_kwarg = 'pk'
        return super().get_object()

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return self.queryset.none()

        qs = self.queryset.prefetch_related('images').all()
        return qs


class OrderViewSet(mixins.CreateModelMixin, GenericViewSet):
    """Вьюсет создания заказа."""
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_throttles(self):
        if self.action == 'create':
            self.throttle_scope = 'order.create'
        return super().get_throttles()


class PromoCodeViewSet(ViewSet):
    """Вьюсет проверки работоспособности промокода."""
    @swagger_auto_schema(
        request_body=PromoCodeCheckSerializer,
        responses={200: openapi.Response("Промокод действителен", PromoCodeCheckSerializer),
                   400: openapi.Response("Промокод недействителен или истек", PromoCodeCheckSerializer)}
    )
    @action(methods=['post'], detail=False)
    def check_promo_code(self, request):
        """Проверка работоспособности промокода"""
        promo_code = request.data["code"]
        promo = PromoCode.objects.filter(
            code=promo_code,
            is_active=True,
            valid_from__lte=timezone.now(),
            valid_to__gte=timezone.now()
        )
        if promo:
            return Response("Промокод действителен", 200)
        else:
            return Response("Промокод недействителен или истек", 400)


class BrandViewSet(mixins.ListModelMixin, GenericViewSet):
    """Вьюсет просмотра списка брендов."""

    pagination_class = StandardPagePagination
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
