from django.contrib import admin

from server.apps.shop.models import (
    DeliveryMethod,
    Order,
    OrderItem,
    Product,
    ProductImage,
    ProductType,
)


@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    pass


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    pass


@admin.register(DeliveryMethod)
class DeliveryMethodAdmin(admin.ModelAdmin):
    pass


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    # classes = ['collapse']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    readonly_fields = ('id', 'total_price')
    inlines = [OrderItemInline]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    pass
