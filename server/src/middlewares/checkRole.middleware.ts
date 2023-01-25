import { Response } from 'express';
import dotenv from 'dotenv';

import { ApiError } from '../error/ApiError.js';
import { tokenService } from './../services/token.service.js';

dotenv.config();

type Roles = 'USER' | 'ADMIN';

export const checkRoleMiddleware = (role: Roles) => {
    return (req: any, res: Response, next: Function) => {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return next(ApiError.unauthorized());
            }

            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {
                return next(ApiError.unauthorized());
            }
            const userData: any = tokenService.validateAccessToken(accessToken);
            if (userData.role !== role) {
                return next(ApiError.notAcceptable('Access denied'));
            }

            req.user = userData;
            next();
            //
        } catch (e) {
            return next(ApiError.unauthorized());
        }
    };
};
