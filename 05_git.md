## SSH

### Подключиться к репозиторию через ssh ключ.

#### [**Создать ключ на локальной машине**](https://learn.microsoft.com/ru-ru/azure/virtual-machines/linux/create-ssh-keys-detailed#generate-keys-with-ssh-keygen)

Команда:

`ssh-keygen -t rsa [-f "path_to_file]"`

Пример:

`ssh-keygen -t rsa -f ~/.ssh/decided_service_name/any_file_name_rsa`

Если не указать путь к определнному файлу, то по умолчанию эта команда перезапишет имеющиеся ключи в папке *.ssh*

> Убедитесь что в конце нового файла с непубличным ключом есть пустая строка, иначе ключ не сработает для авторизации.

#### **Скопировать публичный ключ**

Команда:

`cat path_to_file`

Пример:

`cat ~/.ssh/decided_service_name/any_file_name_rsa`

Данные которые отобразились в консоле, нужно скопировать и вставить в нужное поле в настройках аккаунта *github* или *gitlab*

#### Скопировать репозиторий

Перейти в папку в которую хотите склонировать репозиторий

Команда:

`git clone git@github.com:path_to_repo`

Пример:

`git clone git@github.com:twixy123/base-knowledge.git`

#### Клонирование репозитория с ключом из не дефолтной папки

Если вы вставили в аккаунт git хостинга не дефолтный ключ, а например ключ который лежит в папке ***~/.ssh/decided_service_name/any_file_name_rsa***. Нужно создать файл config в .ssh, без каких либо расширений и в него добавить строки:

```
# Private Git Host instance
Host github.custom-host.com
  PreferredAuthentications publickey
  IdentityFile /.ssh/decided_service_name/any_file_name_rsa
```

> Тут нужно указать именно приватный ключ.

При клонировании система должна спросить добавить ли данный хостинг в **known_hosts**, нужно написать **yes**.

Честно говоря не понимаю по какому алгоритму система записывает туда значения

> В этом файде должны появится 3 строки:

`github.custom-host.com ssh-ed25519 ...`

`github.custom-host.com ssh-rsa ...`

`github.custom-host.com ecdsa-sha2-nistp256 ...`

> ... - какой-то алгоритм шифровки, который я не понимаю от куда берется

