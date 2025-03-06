from django.db import models


class PaymentMethodChoices(models.TextChoices):
    """Способы оплаты"""

    CASH = "cash", "Наличными"
    CARD = "card", "Картой"


class ContactPreferenceChoices(models.TextChoices):
    """Предпочтения для связи с пользователем."""

    PHONE_CALL = "phone_call", "Звонок по телефону"
    TELEGRAM = "telegram", "Telegram"
    WHATSAPP = "whatsapp", "WhatsApp"


class ProductTypeChoices(models.TextChoices):
    """Тип товара."""

    CAMERA = "camera", "Фотоаппарат"
    FILM = "film", "Пленка"
    ACCESSORY = "accessory", "Аксессуар"


class DeliveryMethodChoices(models.TextChoices):
    """Тип доставки."""

    PICKUP = "pickup", "Самовывоз"
    VDK_DELIVERY = "VDK delivery", "Доставка по Владивостоку"
    POST = "post", "Доставка почтой России"
    SDEK = "sdek", "Доставка СДЭК"
