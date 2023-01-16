import { Request, Response } from 'express';
import { ApiError } from '../error/ApiError.js';
import { tokenService } from '../services/token.service.js';

export const authMiddleware = (req: any, res: Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.unauthorized());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.unauthorized());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.unauthorized());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.unauthorized());
    }
};
