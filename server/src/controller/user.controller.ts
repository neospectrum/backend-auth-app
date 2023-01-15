import { Request, Response } from 'express';

class UserController {
    async registration(req: Request, res: Response, next: Function) {}
    async login(req: Request, res: Response, next: Function) {}
    async logout(req: Request, res: Response, next: Function) {}
    async activate(req: Request, res: Response, next: Function) {}
    async refresh(req: Request, res: Response, next: Function) {}
    async getUsers(req: Request, res: Response, next: Function) {}
}

export const userController = new UserController();
