import { Router } from 'express';

import { userRouter } from './user.routes.js';
import { deviceRouter } from './device.routes.js';

export const router = Router();

router.use('/user', userRouter);
router.use('/device', deviceRouter);
