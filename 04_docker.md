# Docker

Для начала устанавливаем docker с официального [сайта](https://www.docker.com/)
Для создания docker container для вашего приложения ( на основе vue на vite ) нужно создать в главной директории файл с названием Dockerfile

Для того что бы наш container поднял наш проект нужно сначала указать ему какой image мы будем юзать:

`FROM node:16.14.2-alpine`

В моем случае *node.js* версии *16.14.2*

Дальше говорим ему нашу рабочую директорию, не из которой он будет брать файлы, а именно куда он будет их ложить и от куда он в последующем будет работать:

`WORKDIR /app`

Дальше копируем файлы которые мы можем закэшировать:

```
COPY package*.json .
COPY yarn.lock .

```

Докер умный и он будет отталкиваться от них, это значит что он будет смотреть эти файлы и сравнивать с прошлым созданием image и если эти файлы не изменились, то он не будет заново качать node_modules, а возьмет их из кэша.

Устанавливаем node_modules

`RUN yarn install`

После уже копируем вообще весь проект, в будущий image, от которого будет запускаться container

`COPY . .`

Говорим docker какой порт мы ждем от приложения

`EXPOSE 8080`

Далее делаем build приложения

`RUN yarn build`

И говорим докеру как запустить приложение

`CMD [ "yarn", "preview" ]`

Описание команд можно увидеть [здесь](https://github.com/twixy123/app-main-config/blob/main/Dockerfile)
Сохраняем, переходим в терминал. В терминале переходим в директорию где лежит Dockerfile и начинаем создать image, свой собственный исходя из нашего Dockerfile

`docker build -t image_name .`

**docker** начнет создавать образ с названием *image_name*

Без указания *-t* docker создать безымянный образ

По дефолту docker создает образ с тэгом latest, но для более уникального образа можно указать свой тэг

`docker build -t image_name:tag .`

Что бы собрать image для amd/linux после build нужно прописать команду

`--platform linux/amd64`

`docker build --platform linux/amd64 -t image_name:tag .`

После создания можно посмотреть список образов

`docker image ls`


Вывод будет примерно следующим


| REPOSITORY   | TAG       | IMAGE ID       | CREATED       | SIZE  |
| ------------ | --------- | -------------- | ------------- | ----- |
| image_name   | latest    | ac20ab7789a9   | 5 days ago    | 973MB |
| node         | latest    | ac20ab7789a9   | 5 days ago    | 948MB |

Для того что бы переименовать образ

`docker tag last_image_name new_image_name`

ДЛя того что бы удалить образ можно заюзать команду

`docker rmi image_name|image_id`

Для того что бы удалить все образы которые не имеют имени или не используются

`docker image prune -f`

*-f* потому что docker будет спрашивать "точно ли вы хотите удалить" и что бы не отвечать и лишний раз не нажимать Enter или yes, мы удаляем форсом


Далее когда образ создан, нам нужно поднять container который как раз таки будет держать наше приложение

`docker run -d -p 3000:8080 --rm --name container_image image_name|image_id`

Опции выше написанной команды:
* -d, по умолчанию docker остается в консоле этого container и что бы остановить container нам нужно зайти в новый терминал и там его остановить. А с -d мы сразу выходим из его дефолтного терминала
* -p 3000:8080, указываем docker какой порт нам открыть и какой порт слушать из приложения. Первая цифра это тот порт который нам откроет container, второй порт это тот порт который нужно слушать из нашего приложения.
Что бы открыть localhost без указания порта, порт должен быть 80, это дефолтный порт для браузера.
* --rm, команда для удаления container после его остановки. Если не удалять контейнеры, со временем они могут занимать большое количество места на диске.
* --name container_name, даем название будущему container
* image_name|image_id, название образа от которого мы ходим создать container

Для того что бы остановить container

`docker stop container_name|container_id`

Для того что бы погрузиться внутрь контейнера

`docker attach container_name|container_id`

Что бы посмотреть список образов нужно прописать команду

`docker ps`

Команда выведет все запущенные образы, для того что бы вывести вообще все образы:

`docker ps -a`

Для того что бы удалить container

`docker rm container_name|container_id`

Для того что бы удалить все контейнеры

`docker container prune`

Так же можно добавить флаг *-f*

Для начала, естественно нужно зарегаться в [docker hub](https://hub.docker.com/)
Для пуша image в docker hub, нужно зайти в терминале в этот docker hub

`docker login -u username`

Дальше он попросит пароль, при вводе пароля в терминале не будет отображаться никаких действий, но по факту пароль вводится
Далее нужно переименовать образ в название которое будет содержать username ( политика docker hub )

`docker tag image_name username/image_name:tag`

Далее пушим образ в docker hub

`docker push username/image_name:tag`

Для скачивания образа на другой комп, можно создать уникальный [access token](https://hub.docker.com/settings/security) для docker hub к своему аккаунт, что бы не делиться именно паролем. При создании этого access токена вы можете задания ограничение для юзера который будет использовать этот токен.

`docker pull username/image_name:tag`

А так же небольшой гайд что такое [docker_compose](https://habr.com/ru/company/ruvds/blog/450312/), там же и пример


**docker.io** это docker для сервера без ui интерфейса


## Зайти в контейнер

**Провалиться внутрь контейнера через оболочку bash**

Команда:

`docker exec -it docker_name/docker_id /bin/bash`

**Узнать ip контейнера**

Команда:

`ip r | grep default`

ИЛИ

`netstat -r`

## Поднять пустой Ubuntu

**Dockerfile**
```
FROM ubuntu:latest
CMD tail -f /dev/null
```

---

**Сборка образа**
`docker build -t ubuntu-container .`

---

**Запуск контейнера**

`docker run -d --name my-ubuntu-container ubuntu-container tail -f /dev/null`

*Команда tail -f /dev/null позволяет контейнеру продолжать работать, не выполняя никаких операций.*

---

**Взаимодействие с контейнером**
`docker exec -it my-ubuntu-container bash`




