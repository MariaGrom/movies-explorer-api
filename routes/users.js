import { Router } from 'express';
import { updateUserProfile, findCurrentUser } from '../controllers/users.js'
import { userProfileValidator } from '../validators/validators.js';

export const userRoutes = Router();

userRoutes.get('/users/me', findCurrentUser);
userRoutes.patch('/users/me', userProfileValidator, updateUserProfile);