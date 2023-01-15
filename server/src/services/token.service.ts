import jwt from 'jsonwebtoken';
import { TokenModel } from '../models/token.model.js';

const accessKey = process.env.JWT_ACCESS_SECRET || '12345';
const refreshKey = process.env.JWT_REFRESH_SECRET || '12345';

class TokenService {
    async generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, accessKey, { expiresIn: '15min' });
        const refreshToken = jwt.sign(payload, refreshKey, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken,
        };
    }
    async validateAccessToken(token: string) {
        const userData = jwt.verify(token, accessKey);

        return userData;
    }
    async validateRefreshToken(token: string) {
        const userData = jwt.verify(token, refreshKey);
        return userData;
    }
    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await TokenModel.findOne({ _id: userId });
        if (tokenData) {
            tokenData.token = refreshToken;
            return tokenData.save();
        }
        const token = await TokenModel.create({ user: userId, token: refreshToken });
        return token;
    }
    async removeToken(refreshToken: string) {
        const tokenData = await TokenModel.deleteOne({ token: refreshToken });
        return tokenData;
    }
    async findToken(refreshToken: string) {
        const tokenData = await TokenModel.findOne({ token: refreshToken });
        return tokenData;
    }
}

export const tokenService = new TokenService();
