import { Schema, model } from 'mongoose';

const deviceSchema = new Schema({
    name: { type: String, unique: true, required: true },
    price: { type: Number },
    rating: { type: Number, default: Number },
    image: { type: String },
});

export const DeviceModel = model('device', deviceSchema);
