import express from 'express';
import cors from 'cors';
import colors from 'colors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { router } from './routes/index.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

dotenv.config();

const port = process.env.APP_PORT || 5000;
const origin = process.env.ORIGIN_URL || '';
const db = process.env.MONGO_URL || '';

const app = express();

app.use(morgan('dev'));
app.use(cors({ origin, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(db);
        app.listen(port, () => {
            console.log(`Server started on PORT:${colors.america(port.toString())}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
