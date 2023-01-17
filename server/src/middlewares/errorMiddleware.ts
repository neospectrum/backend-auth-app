import { Request, Response } from 'express';
import { ApiError } from '../error/ApiError.js';

// Error handling middleware
export const errorMiddleware = (err: any, req: Request, res: Response, next: Function) => {
    console.log(err);

    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Unhappend error' });
};
