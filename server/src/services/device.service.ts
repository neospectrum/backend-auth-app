import { IDevice } from '../controllers/device.controller.js';
import { DeviceDto } from './../dtos/device.dto.js';
import { ApiError } from './../error/ApiError.js';
import { DeviceModel } from './../models/device.model.js';

class DeviceService {
    async create({ name, price, image }: IDevice): Promise<IDevice | undefined> {
        const candidate = await DeviceModel.findOne({ name });
        if (candidate) {
            throw ApiError.badRequest('Device already exist');
        }

        const device = await DeviceModel.create({ name, price, image });
        const deviceDto = new DeviceDto(device);

        return deviceDto;
    }
    async findOne(name: string): Promise<IDevice | undefined> {
        const device = await DeviceModel.findOne({ name });
        if (device) {
            throw ApiError.badRequest('Device doesnt exist');
        }

        const deviceDto = new DeviceDto(device);

        return deviceDto;
    }
    async findAll(): Promise<IDevice[] | undefined> {
        const devices = await DeviceModel.find();
        if (!devices) {
            throw ApiError.badRequest('Device list are empty');
        }

        const devicesDto = devices.map(
            ({ name, price, image }) => new DeviceDto({ name, price, image }),
        );

        return devicesDto;
    }
}

export const deviceService = new DeviceService();
