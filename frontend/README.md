# Frontend PlenkaPlace 📷

![Logo](https://github.com/S3raphimCS/plenkaplace/blob/main/frontend/src/app/opengraph-image.png)

## Технологический стек

- Next.js 15.1.7
- TailwindCSS
- Redux + toolkit + persist + encrypt
- yup + zod

## Развёртывание

Для развёртывания проекта следует использовать Docker + Compose(или k8s). Сам Next.js внутри Dockerfile следует разворачивать как:

```bash
  npm run start
```

Контейнер компоуза может выглядеть примерно так:

```docker
  next:
    container_name: plenka-front
    restart: unless-stopped
    image: ЕСЛИ ВЫКЛАДЫВАЕМ НА ХАБ ДОКЕРА
    volumes:
        - images:/app/public
    networks:
        - bridge_bus
```

## Обратная связь

Для связи можно обратиться с письмом на hydra1337channel@gmail.com ✉️
