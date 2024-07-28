FROM node:16.14.2-alpine as builder

ARG ARG_NAME
RUN git clone -b dev https://${ARG_NAME}:${ARG_NAME}@gitlab_ssh_link

ARG ARG_2_NAME
RUN cd ./cloned-app-folder && \
    sed s/{\ARG_2_NAME}/$CI_TOKEN/g .npmrc.example >> .npmrc && \
    npm ci && \
    cd ../

RUN cd ./cloned-app-folder && \
    npm run build

FROM nginx:latest
WORKDIR /var/www/html
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/entrypoint.sh /docker-entrypoint.d/ <- данный файл выполняется сразу при запуске контейнера
RUN chmod +x /docker-entrypoint.d/entrypoint.sh
COPY --from=builder --chown=www-data /cloned-app-folder/dist .
