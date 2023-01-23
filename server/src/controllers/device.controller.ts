import e, { Request, Response } from 'express';
import colors from 'colors';
import dotenv from 'dotenv';

import { CustomRequest } from './../types/interfaces/IRequest.js';
import { deviceService } from '../services/device.service.js';

dotenv.config();

export interface IDevice {
    name: string;
    price: number;
    image: string;
}

class DeviceController {
    async create(req: CustomRequest<IDevice>, res: Response, next: Function) {
        try {
            const { name, price, image } = req.body;

            const device = await deviceService.create({ name, price, image });

            return res.json(device);
        } catch (error) {
            next(error);
        }
    }
    async delete(req: Request, res: Response, next: Function) {
        try {
        } catch (error) {
            next(error);
        }
    }
    async update(req: Request, res: Response, next: Function) {
        try {
        } catch (error) {
            next(error);
        }
    }
    async getOne(req: CustomRequest<{ name: string }>, res: Response, next: Function) {
        try {
            const { name } = req.body;

            const device = await deviceService.findOne(name);

            return device;
        } catch (error) {
            next(error);
        }
    }
    async getAll(req: Request, res: Response, next: Function) {
        try {
            const devices = await deviceService.findAll();

            return devices;
        } catch (error) {
            next(error);
        }
    }
}

export const deviceController = new DeviceController();
