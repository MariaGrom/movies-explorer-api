import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { constants } from 'http2';
import { errors } from 'celebrate';
import { userRoutes } from './routes/users.js';
import { createUser, login } from './controllers/users.js'
import { auth } from './middlewares/auth.js';
import { userBodyValidator, userLoginValidator } from './validators/validators.js';
import { NotFoundError } from './errors/NotFoundError.js';
import { requestLogger, errorLogger } from './middlewares/logger.js'

const app = express();

const { PORT = 3000, NODE_ENV = 'development' } = process.env;

// Определяем какой секретный ключ выбираем при продакшене
const config = dotenv.config({ path: NODE_ENV === 'production' ? '.env' : '.env.common' }).parsed;

app.set('config', config);

mongoose.set({ runValidators: true });
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/bitfilmsdb'); // подключаемся к базе данных

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса


// Добавить сюда CORS
// app.use(cors({
//   origin: '*',
//   allowedHeaders: [
//     'Content-Type',
//     'Authorization',
//   ],
// }));

// Подключаем логгер запросов
app.use(requestLogger);

// Вызываем роутинг регистрации
app.post('/signup', userBodyValidator, createUser);

// Вызываем роутинг входа
app.post('/signin', userLoginValidator, login);

// Вызываем авторизацию
app.use(auth);

// Вызываем роутинг пользователя
app.use('/', userRoutes);

// Вызываем роутинг фильмов





// Запрос главной страницы приложения
app.all('/*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

// Подключаем логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use((err, req, res, next) => {
  const status = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = err.message || 'Неизвестная ошибка';
  res.status(status).send({ message });
  next();
});


app.listen(PORT, () => {
  console.log(`Запускаем сервер ${PORT}!`);
});