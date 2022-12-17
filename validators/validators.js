import { Joi, celebrate } from 'celebrate';
import { urlLink } from '../models/movies.js';

// Валидация пользователя
// export const userIdValidator = celebrate({
//   params: Joi.object({
//     userId: Joi.string().hex().length(24).required(),
//   }).required(),
// });

export const userBodyValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const userProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
  }),
});

export const userLoginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});