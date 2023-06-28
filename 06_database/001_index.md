## Базы данных

* [MYSQL](#mysql)
* [POSTGRESQL](#postgresql)

#### **Нормальная форма**

1. Ячейка бд должна содержать 1 значение
2. Каждая запись должна иметь id

> При написании скриптов в бд, в конце строки всегда нужно ставить ";"

## MYSQL

#### **Посмотреть все базы данных на сервере**

Команда:

`SHOW DATABASES;`

#### **Создание базы данных**

Команда:

`CREATE DATABASE new_database_name;`

Пример:

`CREATE DATABASE school_db;`

#### **Удалить базу данных**

Команда:

`DROP DATABASE database_name;`

Пример:

`DROP DATABASE school_db;`

#### **Использовать определенную бд в сессии**

Команда:

`USE database_name;`

Пример:

`USE school_db;`

#### **Посмотреть таблицы внутри выбранной базы данных**

Команда:

`show tables`

#### **Создать таблицу в выбранной бд**

Команда:

`CREATE TABLE table_name(primary_key INT AUTO_INCREMENT PRIMARY KEY, key_name VARCHAR(255) NOT NULL);`

> Создание колонок в таблице чередуется запятой в круглых скобках.

* **AUTO_INCREMENT** - ключ будет создаваться автоматически самим сервером баз данных
* **PRIMARY KEY** - Первичный ключ каждой сущности - т.е. именно этот ключ будет использоваться как указатель из других табличек
* **NOT NULL** - Значение этой колонки в записи сущности не может быть пустым
* **INT** - тип данных *число*
* **VARCHAR(255)** - тип данных *строка* которое будет состоять из максимум 255 символов

Пример:

`CREATE TABLE teacher(id INT AUTO_INCREMENT PRIMARY KEY, surname VARCHAR(255) NOT NULL);`

#### **Посмотреть какие поля есть в таблице**

Команда:

`show columns FROM table_name;`

Пример:

`show columns FROM teacher;`

#### **Создание таблицы с привязкой к ключу из другой таблицы**

Команда:

`CREATE TABLE table_name(primary_key INT AUTO_INCREMENT PRIMARY KEY, foreign_key INT NOT NULL, FOREIGN KEY (foreign_key) references table_for_link_key(link_key));`

> Связывание ключа объявляется как следующий ключ, через зарятую после ключа который нужно связать.
> Ключ который будет ссылкой должен быть того же типа что и ключ из другой таблицы который будет связан.

* **FOREIGN KEY (foreign_key)** - Говорим что дальше будет объявлен внешний ключ, в скобках пишем ключ из нынешней таблицы который будет указывать на внешний ключ из другой таблицы.
* **references table_for_link_key(link_key)** - Говорим из какой таблицы взять нужный ключ.

Пример:

`CREATE TABLE lesson(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, teacher_id INT NOT NULL, FOREIGN KEY (teacher_id) references teacher(id));`

#### **Вставить сущность в таблицу**

Команда:

`INSERT INTO table_name (key_from_table) values (value_for_key);`

Пример:

`INSERT INTO teacher (surname) values ("Иванов");`

> Ключ AUTO_INCREMENT указывать не нужно, так как он создаться автоматически.

#### **Получить все данные из таблицы**

Команда:

`SELECT * FROM table_name;`

Пример:

`SELECT * FROM teacher;`

#### **Получить определенные поля из таблицы**

Команда:

`SELECT key_name_1, key_name_2 FROM table_name;`

Пример:

`SELECT id, surname FROM teacher;`

#### **Получить уникальные сущности из таблицы по ключу**

Команда:

`SELECT DISTINCT key_name FROM table_name;`

Пример:

`SELECT DISTINCT surname FROM teacher;`

#### **Получить данные по условию**

Команда:

`SELECT * FROM table_name WHERE key_name = "desired_value";`

Пример:

`SELECT * FROM teacher WHERE id = 3;`

> Тут же можно использовать разные условия, например **`id < 3`** или **`id > 2`**

#### **Получить ограниченное количество записей**

Команда:

`SELECT * FROM table_name LIMIT desired_limit_value;`

Пример:

`SELECT * FROM teacher LIMIT 2;`

#### **Получить записи из таблицы с переписанными ключами**

Команда:

`SELECT key_name AS 'desired_key_name', second_key_name AS 'desired_for_second_key_name' FROM table_name;`

Пример:

`SELECT id AS 'unique_id', surname AS 'second_name' FROM teacher;`

#### **Отсортировать записи из таблицы**

Команда:

`SELECT * FROM table_name ORDER BY key_name;`

Пример:

`SELECT * FROM teacher ORDER BY surname;`

> Что бы отсортировать данные в обратном порядке в конце условия нужно прописать ключевое слово `DESC` -> `SELECT * FROM teacher ORDER BY surname DESC;`

#### **Добавить колонку в таблицу**

Команда:

`ALTER TABLE table_name ADD key_name type;`

Пример:

`ALTER TABLE teacher ADD age INT;`

Или

`ALTER TABLE teacher ADD name VARCHAR(255) NOT NUll;`

#### **Обновить запись в таблице**

Команда:

`UPDATE table_name SET key_name = "desired_value" WHERE key_for_find = "desired_value_for_find";`

Пример:

`UPDATE teacher SET age = 24 WHERE id = 3;`

> Если не указывать условия в какой записи менять значение, то во всех записях таблицы изменяться данные этого поля.

#### **Получить записи из таблицы с примерным совпадением**

Команда:

`SELECT * FROM table_name WHERE key_name LIKE "template_for_search";`

Пример:

`SELECT * FROM teacher WHERE surname LIKE "%ов";`

* **%значение** - означает что вместо процента может быть любое значение и после этого поля должны иметь прописанное нами значение
* **значение%** - означает что вместо процента может быть любое значение и начинаться поля должны с прописанного нами значения
* **%значение%** - означает что вместо процента может быть любое значение и поля должны иметь прописанное нами значение
* **_значение** - означает что вместо нижнего прочерка может быть любая **ОДНА** буква.
* **значение_%** - означает что поле должно иметь прописанное нами значение и в конце значения полей должны иметь как минимум еще 2 буквы
* **значение__%** - означает что поле должно иметь прописанное нами значение и в конце значения полей должны иметь как минимум еще 3 буквы

#### **Логические операторы для выборки**

Команда:

`SELECT * FROM table_name WHERE first_key_name = || > || < "desired_value" AND second_key_name = || > || < "desired_value";`

Или

`SELECT * FROM table_name WHERE first_key_name = || > || < "desired_value" OR second_key_name = || > || < "desired_value";`

Пример:

`SELECT * FROM teacher WHERE id > 3 AND age < 45;`

Или

`SELECT * FROM teacher WHERE id > 3 OR age > 30;`

* **AND** - логический оператор **"И"**, означает что все условия слева и справа от этого оператора должны совпасть.
* **OR** - логический оператор **"ИЛИ"**, означает что одно из условий слева или справа от этого опретора должно совпасть.

#### **Выборка с отрицанием из результата**

Команда:

`SELECT * FROM table_name WHERE NOT key_value = "desired_value";`

Пример:

`SELECT * FROM teacher WHERE NOT id = 2;`

#### **Выборка между записями**

Команда:

`SELECT * FROM table_name WHERE key_name BETWEEN "first_desired_value" and "second_desired_value";`

Пример:

`SELECT * FROM teacher WHERE age BETWEEN 30 and 45;`

#### **Удаление записи**

Команда:

`DELETE FROM table_name WHERE key_name = "desired_value";`

> Если не указать **WHERE**, то удалятся все записи.

Пример:

`DELETE FROM teacher WHERE id = 6;`

#### **Добавить несколько значений в таблицу**

Команда:

`INSERT INTO table_name (key_name_1, key_name_2) VALUES ("value_for_key_1", "value_for_key2"), ("value_for_key_1", "value_for_key2");`

Пример:

`INSERT INTO lesson (name, teacher_id) VALUES ("Математика", 1), ("Информатика", 1), ("Физика", 2), ("Химия", 4);`

#### **Получение выборки записей из 2ух таблиц по средством объединения выбранных ключей**

Команда:

`SELECT first_table_name.key_name, second_table_name.key_name FROM first_table_name INNER JOIN second_table_name ON first_table_name.key_link_name = second_table_name.foreign_key_name;`

Пример:

`SELECT teacher.surname, lesson.name FROM teacher INNER JOIN lesson ON teacher.id = lesson.teacher_id;`

Тут мы получим таблицу со всеми учителями у которых есть уроки и так же названия этих уроков

#### **Получение выборки записей из 2ух таблиц с получением всех записей первой таблицы и соответствующих записей из второй таблицы**

Команда:

`SELECT first_table_name.key_name, second_table_name.key_name FROM first_table_name LEFT OUTER JOIN second_table_name ON first_table_name.link_key_name = second_table_name.foreign_key_name;`

Пример:

`SELECT teacher.surname, lesson.name FROM teacher LEFT OUTER JOIN lesson ON teacher.id = lesson.teacher_id;`

Тут мы получим таблицу со всеми учителями и их уроками. Если у учителей нет никаких уроков, то в колонку **lesson.name** придет **NULL**

#### **Получение выборки записей из 2ух таблиц с получением всех полей второй таблицы и выбранных ключей из первой таблицы**

Команда:

`SELECT first_table_name.key_name, second_table_name.key_name FROM first_table_name RIGHT OUTER JOIN second_table_name ON first_table_name.link_key_name = second_table_name.foreign_key_name;`

Пример:

`SELECT teacher.surname, lesson.name FROM teacher RIGHT OUTER JOIN lesson ON teacher.id = lesson.teacher_id;`

Тут мы получим таблицу с двумя колонками со всеми уроками и учителями у которых есть уроки. Если у каких-то уроков нет учителей, то в первой колонке будет **NULL**

#### **Получение выборки записей из 2ух таблиц со всеми полями из обеих таблиц**

Команда:

``

Пример:

``

---

---

---

## POSTGRESQL

Что бы установить POSTGRESQL нужно перейти к [официальной доке](https://www.postgresql.org/download/) и следовать инструкциям выбрав свою ОС.

Если есть желание установить через brew, во первых скачать brew и перейти по [ссылке](https://formulae.brew.sh/formula/postgresql@15#default) для установки. Так же вот [тут](https://www.youtube.com/watch?v=Obo7rzLr8NQ) парень рассказывает как провести настройку после установки через brew, так как установка через brew не устанавливает ui клиент.

#### **Зайти в базу данных**

Команда:

`psql`

> Таким образом мы подключимся к локальному хосту базы данных **localhost:5432**

#### **Подключиться к базе данных по определенному порту**

Команда:

`psql -h host_name`

Пример:

`psql -h localhost`

#### **Подключиться к базе данных через определенного юзера**

Команда:

`psql -U user_name`

Пример:

`psql -u postgres`

> **postgres** - дефолтный root пользователь, его обычно создают при установке сервера баз данных postgresql

#### **Подключиться к определенной базе данных**

Команда:

`psql -d database_name`

Пример:

`psql -u postgres`

> **postgres** - дефолтная база данных при установке сервера баз данных postgresql

#### **Создать новую базуданных**

Команда:

`create database database_name;`

Пример:

`create database shop;`

> ---
>
> TODO: Разобраться как создать пользователя для конкретной базы данных что бы он мог там создавать таблицы
>
> ---

#### **Выйти из текущей сессии**

Команда:

`exit`

#### **Правильный полный логин в базу данных**

Команда:

`psql -h host_name -U user_name -d database_name`

Пример:

`psql -h localhost -U ruslan -d shop`

#### **Переконнектиться к базе данных**

> Так же по желанию можно просто перейти в другую базу данных находясь под тем же пользователем.

Команда:

`\c database_name`

Пример:

`\c shop`

#### **Посмотреть на каком вы сейчас соединении**

Команда:

`\conninfo`

Или

`\c` ( без указания другой базы данных )

#### **Посмотреть какие таблицы сейчас есть в бд**

Команда:

`\d`

#### **Создать таблицу psql**

Так же как и [mysql](#создать-таблицу-в-выбранной-бд), только в нижнем регистре ( хотя кажется что и в mysql тоже можно было все в нижнем регистре писать ).

Команда:

`create table table_name(key_id_name serial primary key, key_name varchar(255), key_name integer, key_name text, link_key_name integer references another_table_name(key_name_from_another_table));`

* **serial** - означает что это поле будет уникально и создаваться автоматически
* **primary key** - означает что это главное поле на которое можно ссылаться из других таблиц
* **varchar(255)** - строка, которая будет состоять из 255 символов
* **text** - строка, которая имеет не ограниченное количество символов
* **integer** - число, как INT в [mysql](#создать-таблицу-в-выбранной-бд)
* **references table_name(key_name)** - ссылка на ключ из другой таблицы, как и *FOREIGN KEY* в [mysql](#создание-таблицы-с-привязкой-к-ключу-из-другой-таблицы)

Пример:

`create table customer(id serial primary key, name varchar(255), phone varchar(30), email varchar(255));`

#### **Создать запись в таблицу**

Команда:

`insert into table_name(first_key_name, second_key_name) values ('value_for_first_key', 'value_for_second_key');`

Пример:

`insert into customer(name, email, phone) values ('Василий', 'vac@gmail.com', '02');`

#### **Множественное создание записей в таблицу**

Команда:

`insert into table_name(first_key_name, second_key_name) values ('value_for_first_key', 'value_for_second_key'), ('value_for_first_key', 'value_for_second_key'), ('value_for_first_key', 'value_for_second_key');`

Пример:

`insert into customer(name, email, phone) values ('Василий', 'vac@gmail.com', '02'), ('Петр', 'petr@gmail.com', '03');`

#### **посмотреть записи в таблице**

Команда:

`select * from table_name;`

Пример:

`select * from customer;`

#### **Получение всех соответствующих записей из 2ух таблиц по условию**

Команда:

`select first_table.*, second_table.* from first_table inner join second_table on second_table.link_key = first_table.link_key;`

Тут мы получим только те записи, которые соответствуют условию.

Пример:

`select product_photo.*, product.name from product_photo inner join product on product.id = product_photo.product_id;`

#### **Получение записей из 2ух таблиц по средством сопоставления привязанных ключей**

Команда:

`select first_table.*, second_table.* from first_table left join second_table on second_table.link_key = first_table.link_key;`

ИЛИ

`select first_table.*, second_table.* from first_table right join second_table on second_table.link_key = first_table.link_key;`

Тут мы получим каждую запись из *first_table*, если указан ***left join***, или все записи из *second_table*, если указан ***right join*** со всеми колонками и все колонки из записей *second_table/first_table (в зависимости от указанного **join**)*, которые совпадуд по условию.
В колонки из *second_table/first_table (в зависимости от указанного **join**)* талицы будут проставлены пустые значения, если по условию не будет найдена запись из *second_table/first_table (в зависимости от указанного **join**)* таблицы.

> Условие - то что мы пишем после ключевого слова ***on***

*Так же мы можем вместо звездочки написать только нужные нам колонки.*

*Еще если мы хотим получить просто все колонки, можно не указывать названия таблиц после коючевого слова **select**, а просто написать "`*`"*

Пример:

`select product_photo.*, product.name from product_photo left join product on product.id = product_photo.product_id;`

#### **Получение выборки из 2 таблиц по средством сопоставления привязанных ключей с применением алиасов**

Команда:

`select ft.*, st.key_name from first_table ft left join second_table st on st.link_key = ft.link_key;`

Пример:

`select pp.*, p.name from product_photo pp left join product p on p.id = pp.product_id;`

> Несмотря на то что мы объявили **alias** только после указания таблицы, после ключевого слова ***from*** и ***join***, мы все равно можем использовать **alias** и до этого момента.

* Пример пустых значений в колонках из второй таблицы при использовании ***left join***

  ![Пример пустых значений в колонках из второй таблицы при использовании left join](./10_empty-values-left-join.png)
* Пример пустых значений в колонках из первой таблицы при использовании ***right join***

  ![Пример пустых значений в колонках из первой таблицы при использовании right join](./11_empty-values-right-join.png)

#### **Удалить foreign_key из таблицы**

> Лучше этого конечно никогда не делать `:)`

Команда:

`alter table table_name drop constraint key_name;`

Что бы узнать какая колонка у нас сейчас зависима от другой таблицы, можно использовать команду:

`\d table_name;`

В рузельтате будет вывод таблицы и отдельным блоком ключи которые зависимы от других таблиц.
Блок называется ***Foreign-key constraints:***

Пример:

`alter table product_photo drop constraint product_photo_product_id_fkey;`

#### **Удалить запись**

Команда:

`delete from table_name where key_name = "desired_value";`

Пример:

`delete from product_photo where id = 2;`

#### **Обновить запись**

Команда:

`update table_name set key_name = 'desired_value', key_name='desired_value' where key_name = 'desired_value';`

Пример:

`update product_photo set url = 'some-url.com' where id = 1;`

#### **отличие where от having**

having так же как и where производит филтрацию по записям. Разница в том что having производит филтрацию по группам, а where по конкретным строкам

#### **Сортировка в postgress плохо работает с буквенными значениям в не utf-8 кодировке, есть способ исправить это**

Команда:

`select * from table_name order by key_name;`

Запись может плохо отработать если будет не латинский алфавит, что бы такое решить можно использовать следующую конструкцию

`select * from table_name order by key_name using ~<~;`

Пример:

`select * from customer order by name using ~<~;`

#### **ограничить получение записей из таблицы**

Команда:

`select * from table_name limit 1;`

Пример:

`select * from customer limit 1;`

#### **Пропустить какое-то количество записей при выборке из таблицы**

Команда:

`select * from table_name offset 1;`

Пример:

`select * from customer offset 1;`


---
---
---

## Пример архитектуры баз данных для магазина

* Запустить psql сервер
* Залогиниться на сервер через терминал

  `psql -h localhost -U ruslan`

  таким образом осуществиться коннект к дефолтной базе данных, скорее всего это *ruslan*
* создать базу данных

  `create database shop;`

И далее либо сразу перейти в эту бд, либо разлогиниться и зайти в эту бд новым коннектом.

1. `\c shop;`
2.  - 
    - разлогиниться - `exit`
    - новый коннект - `psql -h localhost -U ruslan -d shop`


#### **Создание таблиц**

* `create table customer(id serial primary key, name varchar(255), phone varchar(30), email varchar(255));`
* `create table product(id serial primary key, name varchar(255), description text, price integer);`
* `create table product_photo(id serial primary key, url varchar(255), product_id integer references product(id));`
* `create table cart(id serial primary key, customer_id integer references customer(id));`
* `create table cart_product(cart_id integer references cart(id), product_id integer references product(id));`

#### **Посмотреть все таблицы**

`\d`

![все таблицы](./01_all-tables.png)

**{table_name}_seq (sequnce)** - это програмные таблицы для postgresql которые сервер создает сам. Там лежит конфиг с какого значение начинается *primary key*, какой делать шаг при создании новой записи, какое минимальное значение, какое максимальное. Еще есть какой-то кэш и циклы, но я еще не разобрался что это.

![table sequence](./03_table-sequence.png)

#### **посмотреть каждую таблицу по отдельности**

* `\d customer`
* `\d product`
* `\d product_photo`
* `\d cart`
* `\d cart_product`

![каждая таблица по отдельности](./02_each-tables.png)

#### **Добавить записи в таблицы**

* Customer
  
  Создать записи
  
  `insert into customer(name, email, phone) values ('Василий', 'vac@gmail.com', '02'), ('Петр', 'petr@gmail.com', '03');`
  
  Посмотреть записи
  
  `select * from customer;`
  
  ![Посмотреть записи из таблицы customer](./04_select-customers.png)
* Product
  
  Создать записи
  
  `insert into product (name, description, price) values ('iPhone', 'Greate device', 100000), ('iPad', 'Nice tablet', 70000);`
  
  Посмотреть записи

  `select * from product;`
  
  ![Посмотреть записи из таблицы product](./05_select-product.png)
* Product Photo
  
  Создать записи
  
  `insert into product_photo (url, product_id) values ('iphone_photo', 1);`

  Пока не вставляем запись для *iPad*
  
  Посмотреть записи

  `select * from product_photo;`
  
  ![Посмотреть записи из таблицы product_photo](./06_select-product-photo.png)
* Cart

  Создать записи

  `insert into cart (customer_id) values (1);`

  Посмотреть записи

  `select * from cart;`

  ![Посмотреть записи из таблицы cart](./12_select-cart.png)
* Cart product

  Создать записи

  `insert into cart_product (cart_id, product_id) values (1, 1), (1, 2);`

  Посмотреть все записи

  `select * from cart_product;`

  ![Посмотреть все записи в таблице cart_product](./13_select-cart-product.png)


#### **Посмотреть выборку двух таблиц**

* Код - все записи со всеми колонками из первой таблицы и все колонки из совпадающих записей из второй таблицы

  `select * from product_photo left join product on product.id = product_photo.product_id;`

  Результат

  ![все записи со всеми колонками из первой таблицы и все колонки из совпадающих записей второй таблицы](./07_select-all-columns-left-join.png)
* Код - все записи со всеми колонками из первой таблицы и выбранные колонки из совпадающих записей второй таблицы

  `select product_photo.*, product.name from product_photo left join product on product.id = product_photo.product_id;`

  Результат

  ![все записи со всеми колонками из первой таблицы и выбранные колонки из совпадающих записей второй таблицы](./08_select-all-first-desired-second-left-join.png)
* Код - все записи со всеми колонками из первой таблицы и выбранные колонки из совпадающих записей второй таблицы совместно с алиасами

  `select pp.*, p.name from product_photo pp left join product p on p.id = pp.product_id;`

  Результат

  ![все записи со всеми колонками из первой таблицы и выбранные колонки из совпадающих записей второй таблицы совместно с алиасами](./09_select-all-first-desired-second-left-join-alias.png)


#### **Получить имена клиентов с общей суммой их заказов**

* Посмотреть [структуру](#посмотреть-каждую-таблицу-по-отдельности) таблицы и записи в таблице ***customer***
  
  `\d customer;`

  `select * from customer;`

  ![данные из таблицы customer](./14_combat-tasks-show-customer.png)
* Посмотреть [структуру](#посмотреть-каждую-таблицу-по-отдельности) таблицы и записи в таблице ***cart***
  
  `\d cart;`

  `select * from cart;`

  ![данные из таблицы cart](./15_combat-tasks-show-cart.png)
* Посмотреть [структуру](#посмотреть-каждую-таблицу-по-отдельности) таблицы и записи в таблице ***cart_product***
  
  `\d cart_product;`

  `select * from cart_product;`

  ![данные из таблицы cart_product](./16_combat-tasks-show-cart-product.png)
* Посмотреть [структуру](#посмотреть-каждую-таблицу-по-отдельности) таблицы и записи в таблице ***product***
  
  `\d product;`

  `select * from product;`

  ![данные из таблицы product](./17_combat-tasks-show-product.png)
* Получить таблицу из имен из таблицы ***customer*** и id привзяанной к пользователю записи из таблицы ***cart***

  `select c.name, cart.id as cart_id from customer c left join cart on cart.customer_id=c.id;`

  ![left join таблицы customer с таблицей cart](./18_customer-cart-left-join.png)
* Получить таблицу из имен из таблицы ***customer***, ***id*** привзяанной к пользователю записи из табилцы ***cart*** и ***id*** продукта в привзяанной к ***cart.id*** записи из таблицы ***cart_product***

  `select c.name, cart.id as cart_id, cp.product_id from customer c left join cart on cart.customer_id=c.id left join cart_product cp on cp.cart_id = cart.id;`

  ![left join таблиц customer, cart и cart_product](./19_customer-cart-cart_product-left-join.png)
* Получить таблицу из ***name*** из таблицы ***customer***, ***id*** привзяанной к пользователю записи из табилцы ***cart***, ***id*** продукта в привзяанной к ***cart.id*** записи из таблицы ***cart_product*** и цену продукта по ***cart_product.product_id*** из привзяанной записи из таблицы ***product***

  `select c.name, cart.id as cart_id, cp.product_id, p.price from customer c left join cart on cart.customer_id=c.id left join cart_product cp on cp.cart_id = cart.id left join product p on cp.product_id = p.id;`

  ![left join таблиц customer, cart, cart_product и product](./20_customer-cart-cart_product-product-left-join.png)
* Получить таблицу из ***name*** из таблицы ***customer*** и суммированный ***price*** из привязанных записей из таблицы ***product***

  `select c.name, sum(p.price) from customer c left join cart on cart.customer_id=c.id left join cart_product cp on cp.cart_id = cart.id left join product p on cp.product_id = p.id group by c.id;`

  ![left join from customer to product and grouped by customer id](./21_grouped-customers-sum-price-product.png)
* Получить таблицу из ***name*** из таблицы ***customer*** и суммированный ***price*** из привязанных записей из таблицы ***product*** или дефолтное значение

  `select c.name, coalesce(sum(p.price), 0) as order_sum from customer c left join cart on cart.customer_id=c.id left join cart_product cp on cp.cart_id = cart.id left join product p on cp.product_id = p.id group by c.id;`

  ![customer with order price](./22_grouped-customer-sum-order-price-default-value.png)
* Получить отсортированную таблицу из ***name*** из таблицы ***customer*** и суммированный ***price*** из привязанных записей из таблицы ***product*** или дефолтное значение

  `select c.name, coalesce(sum(p.price), 0) as order_sum from customer c left join cart on cart.customer_id=c.id left join cart_product cp on cp.cart_id = cart.id left join product p on cp.product_id = p.id group by c.id order by order_sum desc;`

  ![sorted customers by price with order price](./23_sorted-grouped-customers-order-price.png)
* Получить отсортированную таблицу из ***name*** из таблицы ***customer*** и суммированный ***price*** из привязанных записей из таблицы ***product*** или дефолтное значение

  `select c.name, coalesce(sum(p.price), 0) as order_sum from customer c left join cart on cart.customer_id=c.id left join cart_product cp on cp.cart_id = cart.id left join product p on cp.product_id = p.id group by c.id having sum(p.price)>0 order by order_sum desc;`

  ![sorted and filtered customers by price with order price](./24_sorted-filtered-customers-with-order-price.png)

