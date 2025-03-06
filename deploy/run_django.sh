#!/bin/sh

python "manage.py" migrate --noinput

python "manage.py" collectstatic --noinput

python "manage.py" create_flatpages

python "manage.py" create_delivery_methods

python "manage.py" create_product_types

django-admin compilemessages

gunicorn -c "$PROJECT_ROOT/gunicorn.conf.py" server.wsgi:application
