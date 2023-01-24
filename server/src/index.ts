import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import { router } from './routes/index.routes.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { getDirName } from './helpers/getDirName.js';

dotenv.config();

// Enter APP_PORT, ORIGIN_URL, MONGO_URL in .env file
const port = process.env.APP_PORT || 5000;
const origin = process.env.ORIGIN_URL || '';
const db = process.env.MONGO_URL || '';

const app = express();
const dirname = getDirName();

// Middlewares, routes and other
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin, credentials: true }));
app.use(express.static(path.resolve(dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorMiddleware);

// Function which starts app
const start = async () => {
    try {
        await mongoose.connect(db);
        app.listen(port, () => {
            console.log(`Server started on PORT:${colors.green(port.toString())}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
