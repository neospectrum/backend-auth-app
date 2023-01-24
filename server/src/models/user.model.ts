import { model, Schema } from 'mongoose';

// User schema for MongoDB
const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'USER' },
    isActivated: { type: Boolean, default: true },
    activationLink: { type: String },
});

export const UserModel = model('user', userSchema);
