from django.core.management import BaseCommand

from server.apps.flatpages.enums import FlatPageTitle
from server.apps.flatpages.models import FlatPage


class Command(BaseCommand):
    """Команда для создания объектов FlatPage для каждого значения FlatPageTitle"""

    help = "Создание объекта FlatPage для каждого значения FlatPageTitle"

    def handle(self, *args, **options):
        created_count = 0
        for title, description in FlatPageTitle.choices:
            flatpage, created = FlatPage.objects.get_or_create(title=title, defaults={'description': description})
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f"Создан FlatPage с названием: {description}"))
        if created_count == 0:
            self.stdout.write(self.style.SUCCESS("Все объекты FlatPage уже существуют"))
        else:
            self.stdout.write(self.style.SUCCESS(f"Создано {created_count} новых объектов FlatPage"))
