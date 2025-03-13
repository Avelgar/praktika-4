const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphqlSchema');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Настройка статического сервера для файлов
app.use(express.static(path.join(__dirname, 'public')));

// Обработка GraphQL запросов
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true, // Включает GraphiQL интерфейс
}));

// Создание HTTP сервера
const server = app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

// Создание WebSocket сервера
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message); // Попробуйте распарсить сообщение
            // Рассылка сообщения всем подключенным клиентам
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(parsedMessage)); // Отправляем сообщение в формате JSON
                }
            });
        } catch (error) {
            console.error('Ошибка при обработке сообщения:', error);
        }
    });
});

// Подключение WebSocket к HTTP серверу
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

// Ваши другие маршруты (например, для получения продуктов) могут быть добавлены здесь
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/products', (req, res) => {
    fs.readFile('./data/products.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка чтения файла');
        }

        const products = JSON.parse(data);
        const category = req.query.category;
        if (category) {
            const filteredProducts = products.filter(product =>
                product.categories.includes(category)
            );
            return res.json(filteredProducts);
        }

        res.json(products);
    });
});
