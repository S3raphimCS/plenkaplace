from decimal import Decimal

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
    FeedbackSerializer,
    OrderSerializer,
    ProductSerializer,
    ProductTypeSerializer,
    PromoCodeCheckSerializer,
    PromoCodeOrderPriceSerializer,
    PromoCodeSerializer,
)
from server.apps.shop.enums import PromoCodeTypeChoices
from server.apps.shop.models import (
    Brand,
    DeliveryMethod,
    Feedback,
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
        responses={200: openapi.Response("Промокод действителен", PromoCodeSerializer),
                   404: openapi.Response("Промокод недействителен или истек")}
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
            return Response(PromoCodeSerializer(instance=promo.first()).data, 200)
        else:
            return Response("Промокод недействителен или истек", 404)

    @swagger_auto_schema(request_body=PromoCodeOrderPriceSerializer)
    @action(methods=["post"], detail=False)
    def get_order_price_with_promo(self, request):
        """Получение стоимости заказа с учетом промокода."""
        promo_code = request.data["code"]
        promo = PromoCode.objects.filter(
            code=promo_code,
            is_active=True,
            valid_from__lte=timezone.now(),
            valid_to__gte=timezone.now()
        ).first()
        if not promo:
            return Response("Промокод недействителен или истек", 404)
        items_data = request.data.pop('items')
        total_price = 0
        for item in items_data:
            product = Product.objects.filter(id=item["product"]).first()
            if product:
                total_price += int(product.price * item["quantity"])

        if promo.discount_type == PromoCodeTypeChoices.fixed_amount:
            discount_value = promo.discount_value
        else:
            discount_value = int(Decimal(total_price) / 100 * promo.discount_value)
        if promo.max_discount:
            if discount_value > promo.max_discount:
                discount_value = promo.max_discount
        return Response({"total_price": total_price, "discount_value": discount_value,
                         "price_with_discount": total_price - discount_value})


class BrandViewSet(mixins.ListModelMixin, GenericViewSet):
    """Вьюсет просмотра списка брендов."""

    pagination_class = StandardPagePagination
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class FeedbackViewSet(mixins.ListModelMixin, GenericViewSet):
    pagination_class = StandardPagePagination
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
