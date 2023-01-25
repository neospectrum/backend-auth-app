import { Schema, model } from 'mongoose';

const basketSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
});

export const BasketModel = model('basket', basketSchema);
