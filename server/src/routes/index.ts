import { Router } from 'express';

import { userRouter } from './user.router.js';

export const router = Router();

// User routes
router.use('/user', userRouter);
