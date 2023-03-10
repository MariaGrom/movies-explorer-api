import { Joi, celebrate } from 'celebrate';
import { urlLink } from '../utils/constants.js';

export const movieIdValidator = celebrate({
  params: Joi.object({
    _id: Joi.string().hex().length(24).required(),
  }).required(),
});

export const movieBodyValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(urlLink).uri({ scheme: ['http', 'https'] }).required(),
    trailerLink: Joi.string().pattern(urlLink).uri({ scheme: ['http', 'https'] }).required(),
    thumbnail: Joi.string().pattern(urlLink).uri({ scheme: ['http', 'https'] }).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
