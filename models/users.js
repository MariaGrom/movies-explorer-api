import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcryptjs';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';

// Создаем схему пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

// Проверяем пользователя - есть в база или нет по почте и паролю
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((document) => {
      if (!document) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль')); // введенная почта не найдена - отклоняем промис
      }
      return bcrypt.compare(password, document.password) // почта найдена - сравниваем пароль и хэш
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль')); // хэши не совпали - отклоняем промис
          }
          const user = document.toObject();
          delete user.password;
          return user;
        });
    });
};

// Создаем модель Пользователя
export const User = mongoose.model('user', userSchema);
