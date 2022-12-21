import { Movie } from '../models/movies.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import { InternalServerError } from '../errors/InternalServerError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ForbiddenError } from '../errors/ForbiddenError.js';

// Создаем контроллер POST-запроса для создания нового фильма
export const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((newMovie) => res.send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err);
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(new InternalServerError('Произошла ошибка сервера'));
      }
    });
};

// Создаем контроллер GET-запроса для сохранения фильма
export const savedMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(() => {
      next(new InternalServerError('Произошла ошибка выгрузки карточек с сервера'));
    });
};

// Создаем контроллер DELETE-запроса для удаления фильма
export const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка не найдена');
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Доступ запрещен');
      } else {
        return movie.remove();
      }
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(new InternalServerError('Произошла ошибка удаление карточки с сервера'));
      }
    });
};
