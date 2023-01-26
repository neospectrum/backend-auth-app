import { Request, Response } from 'express';
import colors from 'colors';
import dotenv from 'dotenv';

import { CustomRequest } from './../types/interfaces/IRequest.js';
import { deviceService } from '../services/device.service.js';
import { IDevice } from '../types/interfaces/IDevice.js';

dotenv.config();

class DeviceController {
    async create(req: CustomRequest<IDevice>, res: Response, next: Function) {
        try {
            const { name, price, info } = req.body;
            const { image } = req.files!;

            const device = await deviceService.create({ name, price, image, info });

            return res.json(device);
        } catch (error) {
            next(error);
        }
    }
    async delete(req: CustomRequest<{ name: string }>, res: Response, next: Function) {
        try {
            const { name } = req.body;

            const device = await deviceService.delete(name);

            return res.json(device);
        } catch (error) {
            next(error);
        }
    }
    async update(req: CustomRequest<IDevice>, res: Response, next: Function) {
        try {
            const { name, price, image } = req.body;

            const device = await deviceService.update({ name, price, image });

            return res.json(device);
        } catch (error) {
            next(error);
        }
    }
    async getOne(req: CustomRequest<{ name: string }>, res: Response, next: Function) {
        try {
            const { name } = req.body;

            const device = await deviceService.findOne(name);

            return res.json(device);
        } catch (error) {
            next(error);
        }
    }
    async getAll(req: Request, res: Response, next: Function) {
        try {
            const devices = await deviceService.findAll();

            return res.json(devices);
        } catch (error) {
            next(error);
        }
    }
}

export const deviceController = new DeviceController();
