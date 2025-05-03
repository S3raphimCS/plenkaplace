FROM python:3.10-slim-bullseye

ENV PROJECT_ROOT /project
ENV SRC_DIR /src
ENV DEPLOY_DIR ./deploy

RUN mkdir $PROJECT_ROOT
COPY $DEPLOY_DIR/gunicorn.conf.py $PROJECT_ROOT
COPY $DEPLOY_DIR/run_django.sh $PROJECT_ROOT

RUN echo 'deb http://mirror.yandex.ru/debian/ bookworm main contrib non-free non-free-firmware \
deb-src http://mirror.yandex.ru/debian/ bookworm main contrib non-free non-free-firmware \
deb http://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware \
deb-src http://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmwar \
deb http://mirror.yandex.ru/debian/ bookworm-updates main contrib non-free non-free-firmware \
deb-src http://mirror.yandex.ru/debian/ bookworm-updates main contrib non-free non-free-firmware' > /etc/apt/sources.list

RUN apt-get update && apt-get install -y libpq-dev gcc

RUN apt-get update && \
    apt-get install -y build-essential python3-dev gettext && \
    apt-get clean

RUN apt-get autoremove -y gcc

COPY ./$SRC_DIR/requirements.txt $PROJECT_ROOT

WORKDIR $PROJECT_ROOT
RUN pip install -r requirements.txt

COPY ./$SRC_DIR $PROJECT_ROOT

RUN chmod +x $PROJECT_ROOT/run_django.sh
CMD ["sh", "/project/run_django.sh"]