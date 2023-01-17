import { Request, Response } from 'express';
import { validationResult, body } from 'express-validator';
import dotenv from 'dotenv';

import { ApiError } from '../error/ApiError.js';
import { userService } from '../services/user.service.js';

dotenv.config();

// Typings
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

interface CustomResponse<T> extends Response {
    body: T;
}

// Enter ORIGIN_URL in .env file
const clientURL = process.env.ORIGIN_URL || '';

// Class which controls user routes
class UserController {
    async registration(
        req: CustomRequest<UserAuthData>,
        res: Response,
        next: Function,
    ): Promise<Response | undefined> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка при валидации', errors.array()));
            }

            const { email, password } = req.body;
            const userData = await userService.registration(email, password);

            // Setting refresh token in cookies
            res.cookie('refreshToken', userData?.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async login(
        req: CustomRequest<UserAuthData>,
        res: Response,
        next: Function,
    ): Promise<Response | undefined> {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            // Setting refresh token in cookies
            res.cookie('refreshToken', userData?.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async logout(
        req: CustomRequestWithCookie<UserRefreshToken>,
        res: Response,
        next: Function,
    ): Promise<Response | undefined> {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);

            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (error) {
            next(error);
        }
    }
    async activate(req: Request, res: Response, next: Function) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);

            return res.redirect(clientURL);
        } catch (error) {
            next(error);
        }
    }
    async refresh(
        req: CustomRequestWithCookie<UserRefreshToken>,
        res: Response,
        next: Function,
    ): Promise<Response | undefined> {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);

            // Setting refresh token in cookies
            res.cookie('refreshToken', userData?.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async getUsers(req: Request, res: Response, next: Function): Promise<Response | undefined> {
        try {
            const users = await userService.getUsers();

            return res.json(users);
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();
