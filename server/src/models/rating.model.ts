import { Schema, model } from 'mongoose';

const ratingSchema = new Schema({
    device: { type: Schema.Types.ObjectId, ref: 'device' },
    rate: { type: Number },
});

export const RatingModel = model('rating', ratingSchema);
