from django.db import models
from decimal import Decimal

from server.apps.shop.enums import (
    ContactPreferenceChoices,
    PaymentMethodChoices,
    PromoCodeTypeChoices,
)


class Brand(models.Model):
    title = models.CharField(max_length=100, unique=True, verbose_name='Название')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Бренд"
        verbose_name_plural = "Бренды"


class PromoCode(models.Model):
    title = models.CharField(max_length=100, verbose_name="Название")
    code = models.CharField(max_length=30, verbose_name="Промокод")
    discount_type = models.CharField(max_length=30, choices=PromoCodeTypeChoices.choices, verbose_name="Тип скидки")
    discount_value = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Величина скидки")
    max_discount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Максимальная скидка", null=True, blank=True)
    is_active = models.BooleanField(default=True, verbose_name="Активен")
    valid_from = models.DateTimeField(verbose_name="Начало действия")
    valid_to = models.DateTimeField(verbose_name="Окончание действия")

    def __str__(self):
        return f"{self.code} ({self.get_discount_type_display()})"

    class Meta:
        verbose_name = "Промокод"
        verbose_name_plural = "Промокоды"


class DeliveryMethod(models.Model):
    """Модель способа доставки."""

    title = models.CharField(max_length=100, unique=True, verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')

    class Meta:
        verbose_name = 'Способ доставки'
        verbose_name_plural = 'Способы доставки'

    def __str__(self):
        return self.title


class ProductType(models.Model):
    """Модель типа товара."""

    title = models.CharField(max_length=100, verbose_name='Название')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Тип товара'
        verbose_name_plural = 'Типы товаров'


class Product(models.Model):
    """Модель товара."""

    title = models.CharField(max_length=100, verbose_name='Название')
    slug = models.SlugField(unique=True, blank=True, verbose_name='Slug')
    description = models.TextField(verbose_name='Описание')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Цена')
    product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE, verbose_name='Тип товара')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, verbose_name='Бренд', null=True, blank=True)
    is_available = models.BooleanField(default=True, verbose_name='Доступен')
    is_available_for_purchasing = models.BooleanField(default=True, verbose_name='Доступен для закупки')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'


class ProductImage(models.Model):
    """Модель изображения товара."""

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images", verbose_name='Товар')
    image = models.ImageField(upload_to='products', verbose_name='Изображение')

    def __str__(self):
        return self.product.title

    class Meta:
        verbose_name = 'Изображение товара'
        verbose_name_plural = 'Изображения товаров'


class Order(models.Model):
    """Модель заказа."""

    first_name = models.CharField(max_length=100, verbose_name='Имя')
    contact_data = models.CharField(max_length=30, verbose_name='Контактные данные', default="+7123456789")
    email = models.EmailField(verbose_name='Email')
    address = models.CharField(max_length=100, verbose_name='Адрес')
    comment = models.TextField(verbose_name='Комментарий', blank=True, null=True)
    delivery_method = models.ForeignKey(DeliveryMethod, on_delete=models.SET_NULL, verbose_name='Способ доставки', null=True)
    contact_preferences = models.CharField(choices=ContactPreferenceChoices.choices, max_length=100, verbose_name='Предпочтения для связи')
    payment_method = models.CharField(max_length=100, verbose_name='Способ оплаты', choices=PaymentMethodChoices.choices)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Итоговая сумма')
    is_processed = models.BooleanField(default=False, verbose_name='Заказ в обработке')
    is_done = models.BooleanField(default=False, verbose_name='Заказ выполнен')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    promo_code = models.ForeignKey(to=PromoCode, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Промокод")
    discount_amount = models.DecimalField(
        max_digits=10, decimal_places=2,
        verbose_name='Сумма скидки', default=0
    )

    def get_total_price(self):
        return sum(item.quantity * item.product.price for item in self.items.all()) - self.discount_amount

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        promo = self.promo_code
        discount_value = 0
        if promo:
            if promo.discount_type == PromoCodeTypeChoices.fixed_amount:
                discount_value = promo.discount_value
            else:
                discount_value = int(Decimal(self.total_price) / 100 * promo.discount_value)
            if promo.max_discount:
                if discount_value > promo.max_discount:
                    discount_value = promo.max_discount
        if discount_value >= self.total_price:
            self.discount_amount = 0
        else:
            self.discount_amount = discount_value
        super().save(force_insert, force_update)

    def __str__(self):
        return f"{self.id} - {self.first_name}, {self.contact_data}, {self.total_price} руб."

    total_price = property(get_total_price)
    get_total_price.short_description = "Итоговая сумма"

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'


class OrderItem(models.Model):
    """Модель позиции заказа."""

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items", verbose_name='Заказ')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Товар')
    quantity = models.PositiveIntegerField(verbose_name='Количество')

    def __str__(self):
        return f"{self.order} {self.product} {self.quantity} шт"

    class Meta:
        verbose_name = 'Позиция заказа'
        verbose_name_plural = 'Позиции заказов'


class Feedback(models.Model):
    image = models.ImageField(upload_to='feedbacks', verbose_name='Изображение')

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
