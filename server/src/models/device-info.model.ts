import { Schema, model } from 'mongoose';

const deviceInfoSchema = new Schema({
    device: { type: Schema.Types.ObjectId, ref: 'device' },
    title: { type: String },
    description: { type: String },
    image: { type: String },
});

export const DeviceInfoModel = model('device_info', deviceInfoSchema);
