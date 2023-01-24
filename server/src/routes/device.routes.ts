import { Router } from 'express';
import { deviceController } from '../controllers/device.controller.js';

export const deviceRouter = Router();

// Creating, updating, deleting device
deviceRouter.post('/', deviceController.create);
deviceRouter.patch('/', deviceController.update);
deviceRouter.delete('/', deviceController.delete);

// Getting devices
deviceRouter.get('/', deviceController.getAll);
deviceRouter.get('/:name', deviceController.getOne);
