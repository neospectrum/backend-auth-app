import { hashSync, compare, genSaltSync } from 'bcrypt';
import { v4 as generateIdV4 } from 'uuid';

import { UserDto } from '../dtos/user.dto.js';
import { ApiError } from '../error/ApiError.js';
import { UserModel } from '../models/user.model.js';
import { IUserData } from '../types/interfaces/IUser.js';
import { tokenService } from './token.service.js';

// Class which manipulates with user: Creating, Logging, Getting him for DB
class UserService {
    // Function which generates hashed password and new tokens for User
    // Registering user in DB
    async registration(email: string, password: string): Promise<IUserData | undefined> {
        // Finding user in DB
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.badRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }

        // Generating hashed password
        const salt = genSaltSync(5);
        const hashPassword = hashSync(password, salt);
        const activationLink = generateIdV4();

        // Creating user in DB
        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        const userDto = new UserDto(user);

        // Generating tokens for user
        const tokens = tokenService.generateTokens({ ...userDto });
        if (!tokens) {
            throw ApiError.notFound('TOKENS NOT FOUND');
        }
        await tokenService.saveToken(user.id, tokens.refreshToken);

        // Sending userData to controller
        return {
            ...tokens,
            user: userDto,
        };
    }
    // Function which compares password and if its correct, we generate new tokens
    async login(email: string, password: string): Promise<IUserData | undefined> {
        // Finding user in DB
        const candidate = await UserModel.findOne({ email });
        if (!candidate) {
            throw ApiError.badRequest('Пользователь с таким email не найден');
        }

        // Comparing password
        const isCorrectPassword = compare(password, candidate.password);
        if (!isCorrectPassword) {
            throw ApiError.badRequest('Неверный пароль');
        }

        // Generating new tokens
        const userDto = new UserDto(candidate);
        const tokens = tokenService.generateTokens({ ...userDto });
        if (!tokens) {
            throw ApiError.notFound('TOKENS NOT FOUND');
        }
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        // Sending userData to controller
        return {
            ...tokens,
            user: userDto,
        };
    }
    // If user logged out, then user refresh token will killed from DB
    async logout(refreshToken: string) {
        // Removing token from DB
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    // Finding user by activation link and if user exist we activate account
    async activate(activationLink: string): Promise<any> {
        // Activating E-mail: TODO
        // Find user in DB
        const user = await UserModel.findOne({ activationLink });
        if (!user) {
            throw ApiError.badRequest('Неккоректная ссылка активации');
        }

        // Saving is user account activated
        user.isActivated = true;
        await user.save();
    }
    // Validating token, finding it, and if it exist, generate new tokens and sending userData to controller
    async refresh(refreshToken: string): Promise<IUserData | undefined> {
        // Checking token
        if (!refreshToken) {
            throw ApiError.unauthorized();
        }
        // Validating and finding token in DB
        const userData = tokenService.validateRefreshToken(refreshToken);
        const token = await tokenService.findToken(refreshToken);

        if (!userData || !token) {
            throw ApiError.unauthorized();
        }
        if (typeof userData === 'string') {
            throw ApiError.unauthorized();
        }
        // Finding user and creating new tokens
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        // Saving token
        if (!tokens) {
            throw ApiError.notFound('TOKENS NOT FOUND');
        }
        await tokenService.saveToken(userDto.id, tokens?.refreshToken);

        // Sending userData to controller
        return {
            ...tokens,
            user: userDto,
        };
    }
    // Getting all users from DB
    async getUsers(): Promise<any | undefined> {
        // Finding users in DB
        const users = await UserModel.find();
        return users;
    }
}

export const userService = new UserService();
