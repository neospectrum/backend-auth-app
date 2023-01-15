import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { userService } from '../services/user.service.js';

interface UserAuthData {
    email: string;
    password: string;
}

interface UserRefreshToken {
    refreshToken: string;
}

interface CustomRequest<T> extends Request {
    body: T;
}

interface CustomRequestWithCookie<T> extends Request {
    cookies: T;
}

class UserController {
    async registration(req: CustomRequest<UserAuthData>, res: Response, next: Function) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next();
            }

            const { email, password } = req.body;
            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData?.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async login(req: CustomRequest<UserAuthData>, res: Response, next: Function) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            res.cookie('refreshToken', userData?.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async logout(req: CustomRequestWithCookie<UserRefreshToken>, res: Response, next: Function) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (error) {
            next(error);
        }
    }
    async activate(req: Request, res: Response, next: Function) {}
    async refresh(req: Request, res: Response, next: Function) {}
    async getUsers(req: Request, res: Response, next: Function) {}
}

export const userController = new UserController();
