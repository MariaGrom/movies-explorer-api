import { Joi, celebrate } from 'celebrate';

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
    email: Joi.string().email().required(),
  }),
});

export const userLoginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
