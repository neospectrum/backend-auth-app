import path from 'path';
import { v4 as uuidV4 } from 'uuid';

import { IDevice } from '../controllers/device.controller.js';
import { DeviceInfoModel } from '../models/device-info.model.js';
import { DeviceDto } from './../dtos/device.dto.js';
import { ApiError } from './../error/ApiError.js';
import { DeviceModel } from './../models/device.model.js';

class DeviceService {
    async create({ name, price, image, info }: IDevice) {
        const candidate = await DeviceModel.findOne({ name });

        let filename = `${uuidV4()}.jpg`;
        image.mv(path.resolve(__dirname, '..', 'static', filename));

        if (info) {
            const parsedInfo: Array<any> = JSON.parse(info);
            parsedInfo.forEach(({ title, description }) => {
                DeviceInfoModel.create({
                    title,
                    description,
                });
            });
        }

        if (candidate) {
            throw ApiError.badRequest('Device already exist');
        }

        const device = await DeviceModel.create({ name, price, image: filename });
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
    async delete(name: string) {
        const device = await DeviceModel.deleteOne({ name });

        return device;
    }
    async update({ name, price, image }: IDevice) {
        const device = await DeviceModel.updateOne({ name }, { name, price, image });
        const deviceDto = new DeviceDto(device);

        return deviceDto;
    }
}

export const deviceService = new DeviceService();
