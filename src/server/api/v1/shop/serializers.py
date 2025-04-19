from django.utils import timezone
from rest_framework import serializers

from server.apps.shop.enums import (
    ContactPreferenceChoices,
    PaymentMethodChoices,
    PromoCodeTypeChoices,
)
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
    brand = serializers.CharField(read_only=True, source="brand.title", label="Бренд")
    images = ProductImageSerializer(many=True, read_only=True, label="Изображения")
    created_at = serializers.DateTimeField(
        read_only=True,
        label="Дата создания",
        format="%d-%m-%Y %H:%M"
    )
    is_preorder = serializers.BooleanField(read_only=True, label="Предзаказ")

    class Meta:
        model = Product
        fields = ("id", "title", 'brand', "description", "price", "images", "slug",
                  "product_type", "created_at", "is_preorder", "is_available_for_purchasing")


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
    contact_data = serializers.CharField(max_length=20, label="Контактные данные")
    email = serializers.EmailField(max_length=100, label="Email")
    address = serializers.CharField(max_length=255, label="Адрес")
    comment = serializers.CharField(max_length=255, allow_blank=True, label="Комментарий")
    payment_method = serializers.ChoiceField(choices=PaymentMethodChoices.choices, label="Способ оплаты")
    delivery_method = serializers.PrimaryKeyRelatedField(queryset=DeliveryMethod.objects.all(), label="Способ доставки")
    contact_preferences = serializers.ChoiceField(choices=ContactPreferenceChoices.choices, label="Способ связи")
    total_price = serializers.FloatField(read_only=True, label="Сумма заказа")
    promo_code = serializers.CharField(max_length=30, label="Промокод", allow_blank=True, allow_null=True)
    created_at = serializers.DateTimeField(read_only=True, label="Дата создания", format="%d-%m-%Y %H:%M")

    def validate(self, data):
        promo_code = data.get('promo_code')
        if promo_code:
            try:
                promo = PromoCode.objects.get(
                    code=promo_code,
                    is_active=True,
                    valid_from__lte=timezone.now(),
                    valid_to__gte=timezone.now()
                )
                data['promo_code'] = promo
            except PromoCode.DoesNotExist:
                raise serializers.ValidationError("Промокод недействителен или истек")
        return data

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        total_price = order.total_price
        promo = validated_data.get('promo_code')
        if promo:
            if promo.discount_type == PromoCodeTypeChoices.fixed_amount:
                discount_value = promo.discount_value
            else:
                discount_value = int(total_price / 100 * promo.discount_value)
            if promo.max_discount:
                if discount_value > promo.max_discount:
                    discount_value = promo.max_discount
            order.discount_amount = discount_value
            order.save()
        return order

    class Meta:
        model = Order
        fields = ['id', "first_name", "contact_data", "email", "address", "comment", 'payment_method', 'delivery_method',
                  'contact_preferences', "promo_code", 'total_price', 'created_at', 'items']
        read_only_fields = ['created_at']


class PromoCodeSerializer(serializers.ModelSerializer):
    valid_from = serializers.DateTimeField(format="%d-%m-%Y %H:%M")
    valid_to = serializers.DateTimeField(format="%d-%m-%Y %H:%M")

    class Meta:
        model = PromoCode
        fields = ("id", "title", "code", "discount_type", "discount_value",
                  "max_discount", "is_active", "valid_from", "valid_to")


class PromoCodeCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoCode
        fields = ("code",)


class PromoCodeOrderPriceSerializer(serializers.Serializer):
    total_price = serializers.FloatField(label="Сумма заказа", read_only=True)
    discount_value = serializers.FloatField(label="Скидка", read_only=True)
    price_with_discount = serializers.FloatField(label="Сумма заказа с учетом скидки", read_only=True)
    code = serializers.CharField(label="Промокод")
    items = OrderItemSerializer(many=True)


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ("id", "title")


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = "__all__"
