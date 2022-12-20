import mongoose from 'mongoose';
import { urlLink } from '../utils/constants.js';

// Создаем модель фильма
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 300,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => urlLink.test(link),
      message: () => 'Требуется http(s) ссылка',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (link) => urlLink.test(link),
      message: () => 'Требуется http(s) ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => urlLink.test(link),
      message: () => 'Требуется http(s) ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 1,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 1,
  },
}, { versionKey: false });

// Создаем модель Фильма
export const Movie = mongoose.model('movie', movieSchema);
