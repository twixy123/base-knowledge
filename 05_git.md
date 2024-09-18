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

`cat path_to_file.pub`

Пример:

`cat ~/.ssh/decided_service_name/any_file_name_rsa.pub`

Данные которые отобразились в консоле, нужно скопировать и вставить в нужное поле в настройках аккаунта *github* или *gitlab*

#### Скопировать репозиторий

Перейти в папку в которую хотите склонировать репозиторий

Команда:

`git clone git@github.com:path_to_repo`

Пример:

`git clone git@github.com:twixy123/base-knowledge.git`

#### Клонирование репозитория с ключом из ***НЕ*** дефолтной папки

---

##### Способ 1

---

Если вы вставили в аккаунт git хостинга не дефолтный ключ, а например ключ который лежит в папке
***~/.ssh/decided_service_name/any_file_name_rsa***.
Нужно создать файл config в .ssh, если его еще нет, без каких либо расширений и в него добавить строки:

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

---

##### Способ 2

---

В основной файл `.gitconfig` для определенных репозиториев можно указывать отдельные данные для конфигурации.

> Так же в эти данные можно указать и ключ ssh

В конце вашего файла .gitconfig вы можете поместить что-то вроде этого:

```
[includeIf "gitdir:~/company_a/"]
  path = .gitconfig-company_a
[includeIf "gitdir:~/company_b/"]
  path = .gitconfig-company_b
```

**.gitconfig-company_a**

```
[user]
  name = John Smith
  email = john.smith@companya.net

[core]
  sshCommand = ssh -i ~/.ssh/id_rsa_companya
```

**.gitconfig-company_b**

```
[user]
  name = John Smith
  email = js@companyb.com

[core]
  sshCommand = ssh -i ~/.ssh/id_rsa_companyb
```

> ! Внимание ! Изменения в гите будут работать только в проектах где есть папка .git

## Отдельные команды git

### Работа в отдельном коммите

#### Посмотреть метаданные в отдельном коммите

Команда:

`git show commit_hash`

Пример:

`git show 750b0326`

Пример ответа:

```
commit 750b03... (HEAD -> dev, origin/dev, origin/HEAD)
Merge: commit_hash commit_hash
Author: Имя автора
Date: Дата создания коммита

    Что произощло в этом коммите
    
    Сообщение вашего коммита
```

#### Посмотреть количество измененных строк в файлах в отдельном коммите

Команда:

`git show --stat commit_hash`

Пример:

`git show --stat 750b0326`

Пример ответа:

```
commit 750b03... (HEAD -> dev, origin/dev, origin/HEAD)
Merge: commit_hash commit_hash
Author: Имя автора
Date: Дата создания коммита

    Что произощло в этом коммите
    
    Сообщение вашего коммита

eslint-plugin-custom-rules/index.js                                                |  3 +++
eslint-plugin-custom-rules/require-computed-type.js                                | 28 ++++++++++++++++++++++++++++
2 files changed, 31 insertions(+), 0 deletions(-)
```

> Что бы не отображать метаданные нужно установить флаг --pretty в значение пустой строки
`git show --stat --pretty="" 750b0326`

#### Посмотреть изменения в конкретном файле в отдельном коммите

Команда:

`git diff commit_hash^! -- file_path`

Пример:

`git diff 750b0326^! -- eslint-plugin-custom-rules/index.js`

Пример ответа:

```
diff --cc eslint-plugin-custom-rules/index.js
index 04b2c678,04b2c678..00000000
deleted file mode 100644,100644
--- a/eslint-plugin-custom-rules/index.js
+++ /dev/null
@@@ -1,3 -1,3 +1,0 @@@
--const requireComputedType = require("./require-computed-type.js");
--const plugin = { rules: { "require-computed-type": requireComputedType } };
--module.exports = plugin;
```

#### Посмотреть историю конкретного файла

Команда:

`git log -p commit_hash -- file_path`

Пример:

`git log -p 750b0326 -- eslint-plugin-custom-rules/index.js`

#### Вывод всех коммитов, которые ведут к определенному коммиту

`git rev-list commit-hash`

#### Фильтрация коммитов по дате

`git rev-list commit-hash`


### Перемещение коммитов или их файлов

#### Перетащить файлы из определенного коммита в текущий HEAD

Команда:

`git checkout commit_hash -- file_path`

Пример:

`git checkout 750b0326 -- eslint-plugin-custom-rules/index.js`

> Файл появится в вашем HEAD как stage файл ( как будто после git aa ) без нового коммита.

#### Перетащить коммит

Команда:


`git cherry-pick `


### Работа с ветками

#### Вывод коммитов в указанной ветке

`git rev-list branch-name`

- Ограниченный вывод количества выводимых коммитов
  - `git rev-list --max-count=10 branch-name`
- Вывести отфильтрованный список коммитов по дате
  - `git rev-list --since="2 weeks ago" branch-name`
  - `git rev-list --until="2024-01-01" branch-name`
  - `git rev-list --since="2024-07-21" --until="2024-07-23" branch-name`
- Фильтрация коммитов по автору или коммиттеру
  - `git rev-list --author="Author Name" branch-name`
  - `git rev-list --committer="Committer Name" branch-name`
- Поиск коммитов по сообщению
  - `git rev-list --grep="fix" branch-name`
- Вывод коротких хешей коммитов
    - `git rev-list --abbrev-commit branch-name`
- Подсчет количества коммитов
    - `git rev-list --count branch-name`




### Сравнение GIT

#### Вывести изменения при сравнении 2 веток

`git diff main..dev`

#### Вывести только названия файлов при сравнении 2 веток

`git diff --stat main..dev`

#### Вывести коммиты которые при сравнении 2 веток

`git log main..dev`

Выведет все комииты которые есть в `dev` но нет в `main`. Что бы вывести коммиты из main которых нет в dev,
нужно поменять местами названия веток

`git log dev..main`

> опции для log так же будут работать для этой команды сравнения: `git log --graph --decorate --pretty=raw main..dev`

#### Вывод всех коммитов между двумя ветками или коммитами

`git rev-list main..dev`

> Выведет список хешей коммитов

#### Вывести количество коммитов из одной ветки, отсутствующих в другой

`git rev-list --count main..dev`




