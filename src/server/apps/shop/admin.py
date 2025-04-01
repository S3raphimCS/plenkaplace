from django.contrib import admin

from server.apps.shop.models import (
    Brand,
    DeliveryMethod,
    Feedback,
    Order,
    OrderItem,
    Product,
    ProductImage,
    ProductType,
    PromoCode,
)


@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    pass


class ProductItemInline(admin.TabularInline):
    model = ProductImage
    extra = 0


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "brand", "price", "is_available")
    list_editable = ("price", "is_available")
    search_fields = ("title",)
    inlines = [ProductItemInline]


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    pass


@admin.register(DeliveryMethod)
class DeliveryMethodAdmin(admin.ModelAdmin):
    list_display = ("title", "description")
    list_editable = ("description",)


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    # classes = ['collapse']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    readonly_fields = ('id', 'total_price', "created_at")
    inlines = [OrderItemInline]
    list_display = ("id", "phone", "email", "contact_preferences", "is_processed")
    list_editable = ("is_processed",)


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    pass


@admin.register(PromoCode)
class PromoCodeAdmin(admin.ModelAdmin):
    pass


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    pass


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    pass
