import jwt from 'jsonwebtoken';
import { TokenModel } from '../models/token.model.js';
import dotenv from 'dotenv';

dotenv.config();

const accessKey = process.env.JWT_ACCESS_SECRET || '12345678';
const refreshKey = process.env.JWT_REFRESH_SECRET || '12345';
console.log(accessKey, refreshKey);

class TokenService {
    async generateTokens(payload: any) {
        try {
            const accessToken = jwt.sign(payload, accessKey, { expiresIn: '1d' });
            const refreshToken = jwt.sign(payload, refreshKey, { expiresIn: '30d' });

            return {
                accessToken,
                refreshToken,
            };
        } catch (error) {
            console.log(error);
        }
    }
    async validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, accessKey);

            return userData;
        } catch (error) {
            console.log(error);
        }
    }
    async validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, refreshKey);
            return userData;
        } catch (error) {
            console.log(error);
        }
    }
    async saveToken(userId: string, refreshToken: string) {
        try {
            const tokenData = await TokenModel.findOne({ _id: userId });
            if (tokenData) {
                tokenData.token = refreshToken;
                return tokenData.save();
            }
            const token = await TokenModel.create({ user: userId, token: refreshToken });
            return token;
        } catch (error) {
            console.log(error);
        }
    }
    async removeToken(refreshToken: string) {
        try {
            const tokenData = await TokenModel.deleteOne({ token: refreshToken });
            return tokenData;
        } catch (error) {
            console.log(error);
        }
    }
    async findToken(refreshToken: string) {
        try {
            const tokenData = await TokenModel.findOne({ token: refreshToken });
            return tokenData;
        } catch (error) {
            console.log(error);
        }
    }
}

export const tokenService = new TokenService();
