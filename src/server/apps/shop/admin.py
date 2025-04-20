from decimal import Decimal
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
from server.apps.shop.enums import PromoCodeTypeChoices


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
    readonly_fields = ("slug",)
    inlines = [ProductItemInline]


@admin.register(DeliveryMethod)
class DeliveryMethodAdmin(admin.ModelAdmin):
    list_display = ("title", "description")
    list_editable = ("description",)


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    readonly_fields = ('id', 'get_total_price', "created_at")
    list_display = ("id", "contact_data", "email", "contact_preferences", "is_processed")
    list_editable = ("is_processed",)
    inlines = [OrderItemInline]
    search_fields = ("contact_data", "email")
    search_help_text = "Поиск по контактным данным или почте заказчика"

    def save_model(self, request, obj, form, change):
        promo = obj.promo_code
        discount_value = 0
        if promo:
            if promo.discount_type == PromoCodeTypeChoices.fixed_amount:
                discount_value = promo.discount_value
            else:
                discount_value = int(Decimal(obj.total_price) / 100 * promo.discount_value)
            if promo.max_discount:
                if discount_value > promo.max_discount:
                    discount_value = promo.max_discount
        if discount_value >= obj.total_price:
            obj.discount_amount = 0
        else:
            obj.discount_amount = discount_value
        super().save_model(request, obj, form, change)

    def get_total_price(self, obj):
        return f"{obj.total_price} ₽"

    get_total_price.short_description = "Итоговая сумма"


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
