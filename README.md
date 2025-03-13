### Инструкция по установке Node.js:

1. Скачайте Node.js с официального сайта [https://nodejs.org/en](https://nodejs.org/en).
2. Запустите установщик и дождитесь завершения установки.
3. Скачайте проект и разархивируйте или клонируйте его в нужную вам папку.
4. Откройте Visual Studio Code и запустите терминал, выполнив команду:
   ```bash
   node -v
   ```
   > Вы должны увидеть версию Node.js, например `v22.11.0`.
5. Откройте папку с проектом в Visual Studio Code и выполните команду в терминале:
   ```bash
   npm init -y
   ```
   > В папке должен создаться файл `package.json`.
6. Установите необходимые зависимости, выполнив команды:
   ```bash
   npm install express express-graphql graphql
   npm install ws
   ```
   > В папке должны создаться файл `package-lock.json` и папка `node_modules`.
7. Для запуска сервера пользователя выполните команду:
   ```bash
   node server.js
   ```
   > Перейдите по ссылке, которая появилась в терминале, чтобы открыть страницу пользователя.
8. Для запуска сервера администратора выполните команду:
   ```bash
   node admin.js
   ```
   > Перейдите по ссылке, которая появилась в терминале, чтобы открыть страницу администратора.

### API-запросы

#### 1. Получение списка товаров (GET /api/products)
**Браузер:**
```
http://localhost:8080/api/products
```
**fetch:**
```javascript
fetch('http://localhost:8080/api/products')
  .then(res => res.json())
  .then(data => console.log(data));
```

#### 2. Добавление товара (POST /api/products)
**fetch:**
```javascript
fetch('http://localhost:8080/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: "Игровая мышь",
        price: 3500,
        description: "RGB-подсветка, 6 кнопок",
        categories: ["Аксессуары"]
    })
})
.then(res => res.json())
.then(data => console.log(data));
```

#### 3. Изменение товара (PUT /api/products/:id)
**fetch:**
```javascript
fetch('http://localhost:8080/api/products/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        price: 4000,
        description: "Обновленный дизайн с RGB-подсветкой"
    })
})
.then(res => res.json())
.then(data => console.log(data));
```

#### 4. Удаление товара (DELETE /api/products/:id)
**fetch:**
```javascript
fetch('http://localhost:8080/api/products/1', {
    method: 'DELETE'
})
.then(res => {
    if (res.ok) {
        console.log('Товар удален успешно');
    } else {
        console.error('Ошибка при удалении товара');
    }
});
```

#### 5. Получение товара по ID (GET /api/products/:id)
**Браузер:**
```
http://localhost:8080/api/products/1
```
**fetch:**
```javascript
fetch('http://localhost:8080/api/products/1')
  .then(res => res.json())
  .then(data => console.log(data));
```

#### 6. Отправка сообщения (POST /api/messages)
**fetch:**
```javascript
fetch('http://localhost:8080/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        sender: "Пользователь",
        content: "Привет, это тестовое сообщение!"
    })
})
.then(res => res.json())
.then(data => console.log(data));
```
