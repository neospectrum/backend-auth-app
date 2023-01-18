import { Request, Response } from 'express';

import { ApiError } from '../error/ApiError.js';
import { tokenService } from '../services/token.service.js';

// Auth middleware which checks if user is authenticated and provides access to routes
export const authMiddleware = (req: any, res: Response, next: Function) => {
    try {
        // Getting auth header
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.unauthorized());
        }

        // Getting access token from header
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.unauthorized());
        }

        // Validating access token
        const userData = tokenService.validateAccessToken(accessToken);

        // TODO: Why this code abort request
        // if (!userData) {
        //     return next(ApiError.unauthorized());
        // }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.unauthorized());
    }
};
