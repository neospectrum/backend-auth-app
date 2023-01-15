import { model, Schema } from 'mongoose';

const tokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    token: { type: String, required: true },
});

export const TokenModel = model('token', tokenSchema);
