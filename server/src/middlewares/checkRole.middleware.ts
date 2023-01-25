import { Response } from 'express';
import dotenv from 'dotenv';

import { ApiError } from '../error/ApiError.js';
import { tokenService } from './../services/token.service.js';

dotenv.config();

type Roles = 'USER' | 'ADMIN';

export const checkRoleMiddleware = (role: Roles) => {
    return (req: any, res: Response, next: Function) => {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return next(ApiError.unauthorized());
            }

            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {
                throw ApiError.unauthorized();
            }
            const userData = tokenService.validateAccessToken(accessToken);
            // if (decoded.role !== role) {
            //     return res.status(403).json({ message: 'Нет доступа' });
            // }
            req.user = userData;
            next();
        } catch (e) {
            res.status(401).json({ message: 'Не авторизован' });
        }
    };
};
