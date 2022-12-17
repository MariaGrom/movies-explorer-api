import mongoose from 'mongoose';

export const urlLink = /^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

// Создаем модель фильма
const movieSchema = new mongoose.Schema({
  country:{
    type: String,
    required: true,
  },
  director:{
    type: String,
    required: true,
  },
  duration:{
    type: Number,
    required: true,
  },
  year:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
    validate: {
      validator: (link) => urlLink.test(link),
      message: () => 'Требуется http(s) ссылка',
    },
  },
  trailerLink:{
    type: String,
    required: true,
    validate: {
      validator: (link) => urlLink.test(link),
      message: () => 'Требуется http(s) ссылка',
    },
  },
  thumbnail:{
    type: String,
    required: true,
    validate: {
      validator: (link) => urlLink.test(link),
      message: () => 'Требуется http(s) ссылка',
    },
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId:{
    // уточнить какой тип данных должен быть
    type: String,
    required: true,
  },
  nameRU:{
    type: String,
    required: true,
  },
  nameEN:{
    type: String,
    required: true,
  }
})

// Создаем модель Фильма
export const Movie = mongoose.model('movie', movieSchema);