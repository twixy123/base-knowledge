### Объяснение построчно

##### before_script (Подготовка перед билдом и деплоем)

```yaml
  'which ssh-agent || (apk update && apk add openssh-client)'
```

- Проверяем, установлен ли ssh-agent.
- Если нет — устанавливаем openssh-client (так как образ docker:dind использует Alpine, а не Debian, поэтому apk вместо apt-get).

```yaml
  eval $(ssh-agent -s)
```

- Запускаем ssh-agent (он управляет приватными ключами для SSH-подключений).

```yaml
  - cat "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
```

- Берём содержимое приватного ключа из файловой CI/CD переменной (Type: File).
- Удаляем \r (возвращение каретки в Windows, лишний символ).
- Добавляем ключ в ssh-agent, чтобы не запрашивался passphrase.
- *Что делает `cat "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -`?*
  - `cat "$SSH_PRIVATE_KEY"` → выводит SSH-ключ в терминал.
  - `tr -d '\r' → удаляет \r` (Windows-символы, иногда ломают SSH).
  - `ssh-add -` → добавляет ключ в ssh-agent, чтобы не указывать `-i ~/.ssh/id_rsa`.
- Почему это нужно?
  - Если приватный ключ имеет passphrase, ssh-agent кеширует его, и GitLab CI/CD не запрашивает пароль при каждом запуске.

```yaml
  - mkdir -p ~/.ssh
  - chmod 700 ~/.ssh
```

- Создаём ~/.ssh, если его нет.
- Даем ему права 700 (только для владельца).

```yaml
  - echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config
```

- Отключаем проверку подлинности сервера по ключу.
- Без этого CI/CD может остановиться, если сервер ещё не был в known_hosts.
- *Что делает `echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config`?*
  - `"Host *"` → Применяет правила ко всем SSH-соединениям.
  - `"StrictHostKeyChecking no"` → Отключает проверку сервера (иначе CI/CD может зависнуть).
- Почему это нужно?
  - GitLab CI/CD не может подтвердить fingerprint сервера (как человек), без этой строки пайплайн зависнет на yes/no.

##### Пайплайны от gitlab могут начать ругаться на отсутствие защиты ключа.
  - Я обошел так:
    - ```yaml
      before_script:
        - mkdir -p ~/.ssh
        - chmod 700 ~/.ssh
        - echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config
        - ssh-keyscan -p "$SSH_PORT" "$SSH_HOST" >> ~/.ssh/known_hosts
        - cat "$SSH_PRIVATE_KEY" | tr -d '\r' > ~/.ssh/id_ed25519
        - chmod 600 ~/.ssh/id_ed25519
      ```
    - Далее в [deploy](#deploy-деплой-на-сервер) я обращаюсь уже не к `-i "$SSH_PRIVATE_KEY"`, а к `-i ~/.ssh/id_ed25519`


```yaml
  - echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USER" --password-stdin
```

- Залогиниваемся в Docker Hub перед docker push.

##### build (Сборка образа)

```yaml
  image: docker:20.10.24
  services:
    - docker:dind
```

- Запускаем Docker-in-Docker (docker:dind) для создания образа.
- Важно: без dind GitLab Runner не сможет билдить Docker-образы.

```yaml
  script:
    - docker build -t $IMAGE_NAME .
    - docker push $IMAGE_NAME
```

- Собираем Docker-образ.
- Пушим в Docker Hub.

##### deploy (Деплой на сервер)

```yaml
  script:
    - ssh -i "$SSH_PRIVATE_KEY" -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" "{Любой способ для запуска контейнера на wps}"
```

- -i "$SSH_PRIVATE_KEY" – указываем SSH-ключ напрямую из файловой CI/CD переменной (перменная имеет тип file).
  - Учитывать что Gitlab может начать ругаться на секьюрность. Лучше скопировать контент ключа в `~/.ssh/`. Описал [тут](#пайплайны-от-gitlab-могут-начать-ругаться-на-отсутствие-защиты-ключа)
- -p "$SSH_PORT" – добавляем поддержку кастомного порта (по умолчанию 22).
- `{Любой способ для запуска контейнера на wps}` - лично у меня поднят docker-compose и есть папка в которой есть Makefile.
  - ```yaml
        - ssh -i "$SSH_PRIVATE_KEY" -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" "cd {path-to-folder-with-Makefile} && sudo make {command-name}"
    ```
В файле есть команда с помощью которой я запускаю сервисы из docker-compose
- ***Почему мы используем `-i "$SSH_PRIVATE_KEY"`, если это целый файл?***
  - обычно `-i` указывает путь к файлу, а мы передаём содержимое файла.
  - Но GitLab CI/CD автоматически монтирует файловые переменные в `/builds/...` и подставляет путь к файлу в `$SSH_PRIVATE_KEY`.
  - Когда мы создаём переменную `SSH_PRIVATE_KEY` типа File, GitLab сохраняет содержимое ключа в файл.
  - `$SSH_PRIVATE_KEY` в CI/CD содержит путь к этому файлу.
  - Поэтому передавать `-i "$SSH_PRIVATE_KEY"` в ssh абсолютно нормально.
- Что делать если пользователь не root и нужно использовать `sudo` - [описал тут](./common.md#как-использовать-sudo-в-gitlab-cicd)
































