import { hashSync, compare, genSaltSync } from 'bcrypt';
import { v4 as generateIdV4 } from 'uuid';
import { UserDto } from '../dtos/user.dto.js';
import { TokenModel } from '../models/token.model.js';

import { UserModel } from '../models/user.model.js';
import { tokenService } from './token.service.js';

class UserService {
    async registration(email: string, password: string) {
        try {
            const candidate = await UserModel.findOne({ email });

            if (candidate) {
                throw Error();
            }

            const salt = genSaltSync(5);
            const hashPassword = hashSync(password, salt);
            const activationLink = generateIdV4();

            const user = await UserModel.create({ email, password: hashPassword, activationLink });
            const userDto = new UserDto(user);

            const tokens = await tokenService.generateTokens({ ...userDto });
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
                throw Error();
            }
            const isCorrectPassword = compare(password, candidate.password);
            if (!isCorrectPassword) {
                throw Error();
            }

            const userDto = new UserDto(candidate);
            const tokens = await tokenService.generateTokens({ ...userDto });

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
}

export const userService = new UserService();
