import { Router } from 'express';
import { createMovie, savedMovie, deleteMovie } from '../controllers/movies.js';
import { movieIdValidator, movieBodyValidator } from '../validators/movies.js';

export const movieRoutes = Router();

movieRoutes.post('/movies', movieBodyValidator, createMovie);
movieRoutes.get('/movies', savedMovie);
movieRoutes.delete('/movies/:_id', movieIdValidator, deleteMovie);
