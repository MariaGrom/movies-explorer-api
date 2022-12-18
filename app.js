import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errors } from 'celebrate';
import { router } from './routes/index.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

const { PORT = 3003, NODE_ENV = 'development' } = process.env;

// Определяем какой секретный ключ выбираем при продакшене
const config = dotenv.config({ path: NODE_ENV === 'production' ? '.env' : '.env.common' }).parsed;

app.set('config', config);

mongoose.set({ runValidators: true });
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/moviesdb'); // подключаемся к базе данных

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// Добавить сюда CORS
app.use(cors({
  origin: '*',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
  ],
}));

// Подключаем логгер запросов
app.use(requestLogger);

// Подключаем все роутинги
app.use(router);

// Подключаем логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());

// Подключаем централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Запускаем сервер ${PORT}!`);
});
