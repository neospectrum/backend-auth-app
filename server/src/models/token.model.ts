import { model, Schema } from 'mongoose';

// Refresh token schema for MongoDB
const tokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    token: { type: String, required: true },
});

export const TokenModel = model('token', tokenSchema);
