from django.core.management import BaseCommand

from server.apps.shop.enums import ProductTypeChoices
from server.apps.shop.models import ProductType


class Command(BaseCommand):
    """Команда для создания типов продуктов."""

    help = 'Создание типов продуктов.'

    def handle(self, *args, **options):
        """Консольный вывод."""
        for value, label in ProductTypeChoices.choices:
            product_type, created = ProductType.objects.get_or_create(title=label)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Объект типа продукта {product_type.title} создан'))

        self.stdout.write(self.style.SUCCESS('Создание объектов типов продуктов завершено.'))
