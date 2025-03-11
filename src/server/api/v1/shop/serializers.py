from django.db import transaction
from loguru import logger
from rest_framework import serializers

from server.apps.shop.enums import (
    ContactPreferenceChoices,
    PaymentMethodChoices,
)
from server.apps.shop.models import (
    DeliveryMethod,
    Order,
    OrderItem,
    Product,
    ProductImage,
    ProductType,
)


class ProductTypeSerializer(serializers.ModelSerializer):
    """Сериализатор типа товара."""

    class Meta:
        model = ProductType
        fields = '__all__'


class DeliveryMethodSerializer(serializers.ModelSerializer):
    """Сериализатор способа доставки."""

    class Meta:
        model = DeliveryMethod
        fields = '__all__'


class ProductImageSerializer(serializers.ModelSerializer):
    """Сериализатор изображения товара."""

    class Meta:
        model = ProductImage
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    """Сериализатор товара."""

    id = serializers.UUIDField(read_only=True)
    product_type = ProductTypeSerializer(read_only=True, label="Тип товара")
    is_available_for_purchasing = serializers.BooleanField(read_only=True, label="Товар для закупки")
    images = ProductImageSerializer(many=True, read_only=True, label="Изображения")

    class Meta:
        model = Product
        fields = ("id", "title", "description", "price", "images", "product_type", "is_available_for_purchasing")


class OrderItemSerializer(serializers.ModelSerializer):
    """Сериализатор позиции заказа."""

    class Meta:
        model = OrderItem
        fields = ("product", "quantity")


class OrderItemForCreateSerializer(serializers.ModelSerializer):
    """Сериализатор позиции заказа для создания."""

    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), label="Товар")

    class Meta:
        model = OrderItem
        fields = ("product", "quantity")


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    first_name = serializers.CharField(max_length=100, label="Имя")
    phone = serializers.CharField(max_length=20, label="Телефон")
    email = serializers.EmailField(max_length=100, label="Email")
    address = serializers.CharField(max_length=255, label="Адрес")
    comment = serializers.CharField(max_length=255, allow_blank=True, label="Комментарий")
    payment_method = serializers.ChoiceField(choices=PaymentMethodChoices.choices, label="Способ оплаты")
    delivery_method = serializers.PrimaryKeyRelatedField(queryset=DeliveryMethod.objects.all(), label="Способ доставки")
    contact_preferences = serializers.ChoiceField(choices=ContactPreferenceChoices.choices, label="Способ связи")
    total_price = serializers.FloatField(read_only=True, label="Сумма заказа")

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order

    class Meta:
        model = Order
        fields = ['id', "first_name", "phone", "email", "address", "comment", 'payment_method', 'delivery_method',
                  'contact_preferences', 'total_price', 'created_at', 'items']
        read_only_fields = ['created_at']
