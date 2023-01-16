import { hashSync, compare, genSaltSync } from 'bcrypt';
import { v4 as generateIdV4 } from 'uuid';
import { UserDto } from '../dtos/user.dto.js';
import { ApiError } from '../error/ApiError.js';
import { TokenModel } from '../models/token.model.js';
import colors from 'colors';

import { UserModel } from '../models/user.model.js';
import { tokenService } from './token.service.js';

class UserService {
    async registration(email: string, password: string) {
        try {
            const candidate = await UserModel.findOne({ email });

            if (candidate) {
                throw ApiError.badRequest(
                    `Пользователь с почтовым адресом ${email} уже существует`,
                );
            }

            const salt = genSaltSync(5);
            const hashPassword = hashSync(password, salt);
            const activationLink = generateIdV4();

            const user = await UserModel.create({ email, password: hashPassword, activationLink });
            const userDto = new UserDto(user);

            const tokens = await tokenService.generateTokens({ ...userDto });

            if (!tokens) {
                throw ApiError.notFound('TOKENS NOT FOUND');
            }
            await tokenService.saveToken(user.id, tokens.refreshToken);

            return {
                ...tokens,
                user: userDto,
            };
        } catch (error) {
            console.log(error);
        }
    }
    async login(email: string, password: string) {
        try {
            const candidate = await UserModel.findOne({ email });
            if (!candidate) {
                throw ApiError.badRequest('Пользователь с таким email не найден');
            }
            const isCorrectPassword = compare(password, candidate.password);
            if (!isCorrectPassword) {
                throw ApiError.badRequest('Неверный пароль');
            }

            const userDto = new UserDto(candidate);
            const tokens = await tokenService.generateTokens({ ...userDto });

            if (!tokens) {
                throw ApiError.notFound('TOKENS NOT FOUND');
            }
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            return {
                ...tokens,
                user: userDto,
            };
        } catch (error) {
            console.log(error);
        }
    }
    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async activate(activationLink: string) {
        try {
            const user = await UserModel.findOne({ activationLink });
            if (!user) {
                throw ApiError.badRequest('Неккоректная ссылка активации');
            }
            user.isActivated = true;
            await user.save();
        } catch (error) {
            console.log(error);
        }
    }
    async refresh(refreshToken: string) {
        try {
            if (!refreshToken) {
                throw ApiError.unauthorized();
            }

            const userData = await tokenService.validateRefreshToken(refreshToken);
            const token = await tokenService.findToken(refreshToken);

            if (!userData || !token) {
                throw ApiError.unauthorized();
            }
            if (typeof userData === 'string') {
                throw ApiError.unauthorized();
            }

            const user = await UserModel.findById(userData.id);
            const userDto = new UserDto(user);
            const tokens = await tokenService.generateTokens({ ...userDto });

            if (!tokens) {
                throw ApiError.notFound('TOKENS NOT FOUND');
            }

            await tokenService.saveToken(userDto.id, tokens?.refreshToken);
            return {
                ...tokens,
                user: userDto,
            };
        } catch (error) {
            console.log(error);
        }
    }
    async getUsers() {
        const users = await UserModel.find();
        return users;
    }
}

export const userService = new UserService();
