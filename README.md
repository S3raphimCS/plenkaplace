# PlenkaPlace

## Используемые технологии

Бэкенд: python3.10, django, django-rest-framework

СУБД: PostgreSQL

Линтеры: isort, flake8

## Настройка проекта

Проект настраивается через переменные окружения, указанные в файле src/.env

Пример .env файла указан в .env.example:

| Ключ                | Значение               | По умолчанию          |
|---------------------|------------------------|-----------------------|
| `SECRET_KEY`        | Секретный ключ         | `the-most-secret-key` |
| `DEBUG`             | Режим дебага           | `True`                |
| `POSTGRES_DB`       | Имя БД                 | `plenkaplace`         |
| `POSTGRES_USER`     | Пользователь БД        | `postgres`            |
| `POSTGRES_PASSWORD` | Пароль пользователя БД | `postgres`            |
| `POSTGRES_HOST`     | Адрес СУБД             | `db`/`localhost`      |
| `POSTGRES_PORT`     | Порт СУБД              | `5432`                |
| `SITE_URL`          | Домен сайта            |                       |
| `BOT_TOKEN`         | Токен ТГ-бота          |                       |


**Локальный разворот проекта**:

1) В директории проекта создать виртуальное окружение python3.10:
   `python3.10 -m venv venv`
2) Активировать виртуальное окружение:
   `. venv/bin/activate` для Linux или `.\venv\Scripts\activate` для Windows
3) Установить зависимости для проекта `pip install -r src/requirements.txt`
4) Заполнить содержимое файла src/.env по примеру в в src/.env.example
5) Перейти в папку src: `cd src`
6) Запустить django миграции: `python manage.py migrate`
7) Создать суперпользователя django: `python manage.py createsuperuser` (для использования в локальной разработке)
8) Запустить django server: `python manage.py runserver`

Проверка на линтеры, перейти в папку src:

1) `flake8`
2) `isort .`

Новые приложения django регистрировать в src/server/apps, соответствующие модули drf - в src/api/v1
