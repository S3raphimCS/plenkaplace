from datetime import datetime

from django.db import models

from server.apps.shop.enums import ContactPreferenceChoices, PaymentMethodChoices


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
    description = models.TextField(verbose_name='Описание')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Цена')
    product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE, verbose_name='Тип товара')
    is_available = models.BooleanField(default=True, verbose_name='Доступен')
    is_available_for_purchasing = models.BooleanField(default=True, verbose_name='Доступен для закупки')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'


class ProductImage(models.Model):
    """Модель изображения товара."""

    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Товар')
    image = models.ImageField(upload_to='products', verbose_name='Изображение')

    def __str__(self):
        return self.product.title

    class Meta:
        verbose_name = 'Изображение товара'
        verbose_name_plural = 'Изображения товаров'


class Order(models.Model):
    """Модель заказа."""

    first_name = models.CharField(max_length=100, verbose_name='Имя')
    phone = models.CharField(max_length=12, verbose_name='Телефон')
    email = models.EmailField(verbose_name='Email')
    address = models.CharField(max_length=100, verbose_name='Адрес')
    comment = models.TextField(verbose_name='Комментарий', blank=True, null=True)
    delivery_method = models.ForeignKey(DeliveryMethod, on_delete=models.SET_NULL, verbose_name='Способ доставки', null=True)
    contact_preferences = models.CharField(choices=ContactPreferenceChoices.choices, max_length=100, verbose_name='Предпочтения для связи')
    payment_method = models.CharField(max_length=100, verbose_name='Способ оплаты', choices=PaymentMethodChoices.choices)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Цена')
    is_processed = models.BooleanField(default=False, verbose_name='Заказ в обработке')
    is_done = models.BooleanField(default=False, verbose_name='Заказ выполнен')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    @property
    def total_price(self):
        return sum(item.quantity * item.product.price for item in self.items.all())

    def __str__(self):
        return f"{self.id} - {self.first_name}, {self.phone}, {self.total_price} руб."

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
