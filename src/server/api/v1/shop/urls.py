from rest_framework.routers import DefaultRouter

from server.api.v1.shop.views import (
    DeliveryMethodViewSet,
    OrderViewSet,
    ProductTypeViewSet,
    ProductViewSet,
)


router = DefaultRouter()
router.register('products', ProductViewSet, basename="products")
router.register('product-types', ProductTypeViewSet, basename="product-types")
router.register('orders', OrderViewSet, basename="orders")
router.register('delivery-methods', DeliveryMethodViewSet, basename="delivery-methods")
