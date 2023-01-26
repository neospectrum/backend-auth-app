import { Router } from 'express';

import { checkRoleMiddleware } from './../middlewares/checkRole.middleware.js';
import { deviceController } from '../controllers/device.controller.js';

export const deviceRouter = Router();

// Creating, updating, deleting device
deviceRouter.post('/', checkRoleMiddleware, deviceController.create);
deviceRouter.patch('/', checkRoleMiddleware, deviceController.update);
deviceRouter.delete('/', checkRoleMiddleware, deviceController.delete);

// Getting devices
deviceRouter.get('/', deviceController.getAll);
deviceRouter.get('/:name', deviceController.getOne);
