from rest_framework.routers import DefaultRouter

from server.api.v1.shop.views import (
    DeliveryMethodViewSet,
    OrderViewSet,
    ProductTypeViewSet,
    ProductViewSet,
    PromoCodeViewSet,
    BrandViewSet
)


router = DefaultRouter()
router.register('products', ProductViewSet, basename="products")
router.register('product-types', ProductTypeViewSet, basename="product-types")
router.register('orders', OrderViewSet, basename="orders")
router.register('delivery-methods', DeliveryMethodViewSet, basename="delivery-methods")
router.register('promo-codes', PromoCodeViewSet, basename="promo-codes")
router.register('brands', BrandViewSet, basename='brands')
