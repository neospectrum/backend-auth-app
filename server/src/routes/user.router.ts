import { Router } from 'express';
import { body } from 'express-validator';

import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const userRouter = Router();

// Routes which registering users
userRouter.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 27 }),
    userController.registration,
);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
// Activating user with mail
userRouter.get('/activate/:link', userController.activate);
// Refreshing tokens
userRouter.get('/refresh', userController.refresh);

// Routes with auth middleware to get data only if user logged in
userRouter.get('/users', authMiddleware, userController.getUsers);
