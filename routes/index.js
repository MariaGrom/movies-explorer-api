import { Router } from 'express';
import { userRoutes } from './users.js';
import { movieRoutes } from './movies.js';
import { createUser, login } from '../controllers/users.js';
import { auth } from '../middlewares/auth.js';
import { userBodyValidator, userLoginValidator } from '../validators/users.js';
import { NotFoundError } from '../errors/NotFoundError.js';

export const router = Router();

// Вызываем роутинг регистрации
router.post('/signup', userBodyValidator, createUser);

// Вызываем роутинг входа
router.post('/signin', userLoginValidator, login);

// Вызываем авторизацию
router.use(auth);

// Вызываем роутинг пользователя
router.use('/', userRoutes);

// Вызываем роутинг фильмов
router.use('/', movieRoutes);

// Запрос главной страницы приложения
router.all('/*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});
