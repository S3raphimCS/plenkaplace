# client/Dockerfile
FROM node:alpine


RUN mkdir /client
COPY ./frontend /client
COPY frontend/package.json /client/package.json
COPY deploy/front_entrypoint.sh /client/front_entrypoint.sh
WORKDIR /client
RUN npm install

CMD ["sh", "./front_entrypoint.sh"]