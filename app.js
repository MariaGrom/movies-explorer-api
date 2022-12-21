import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { errors } from 'celebrate';
import { router } from './routes/index.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

const { PORT = 3003 } = process.env;

// Определяем какой секретный ключ выбираем при продакшене
const config = dotenv.config({
  path: path
    .resolve(process.env.NODE_ENV === 'production' ? '.env' : '.env.common'),
})
  .parsed;

app.set('config', config);

mongoose.set({ runValidators: true });
mongoose.set('strictQuery', false);
mongoose.connect(config.DB_URL); // подключаемся к базе данных

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// Подключаем логгер запросов
app.use(requestLogger);

// Подключаем CORS
app.use(cors({
  origin: '*',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
  ],
}));

// Настройка заголовков
app.use(helmet());

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
