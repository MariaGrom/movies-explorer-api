import { Joi, celebrate } from 'celebrate';
import { ruName, enName, urlLink } from '../utils/constants.js';

export const movieIdValidator = celebrate({
  params: Joi.object({
    _id: Joi.string().hex().length(24).required(),
  }).required(),
});

export const movieBodyValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().min(2).max(300).required(),
    image: Joi.string().pattern(urlLink).uri({ scheme: ['http', 'https'] }).required(),
    trailer: Joi.string().pattern(urlLink).uri({ scheme: ['http', 'https'] }).required(),
    thumbnail: Joi.string().pattern(urlLink).uri({ scheme: ['http', 'https'] }).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().pattern(ruName).required(),
    nameEN: Joi.string().pattern(enName).required(),
  }),
});
