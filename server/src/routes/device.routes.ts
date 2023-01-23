import { Router } from 'express';
import { deviceController } from '../controllers/device.controller.js';

export const deviceRouter = Router();

deviceRouter.post('/create', deviceController.create);
deviceRouter.post('/delete', deviceController.delete);
deviceRouter.patch('/', deviceController.update);

deviceRouter.get('/', deviceController.getAll);
deviceRouter.get('/:name', deviceController.getOne);
