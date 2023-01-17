import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { TokenModel } from '../models/token.model.js';
import { IJWTokens } from '../types/IJWTokens.js';

dotenv.config();

// Secret keys for access key and refresh key
// Enter JWT_ACCESS_SECRET and JWT_REFRESH_SECRET in .env file

const accessKey = process.env.JWT_ACCESS_SECRET || '12345678';
const refreshKey = process.env.JWT_REFRESH_SECRET || '12345';

// Class which manipulating with JWT tokens and DB
class TokenService {
    // Generating access token and refresh token
    async generateTokens(payload: any): Promise<IJWTokens | undefined> {
        try {
            // Generating new JWT tokens
            const accessToken = jwt.sign(payload, accessKey, { expiresIn: '1d' });
            const refreshToken = jwt.sign(payload, refreshKey, { expiresIn: '30d' });

            // Returning tokens
            return {
                accessToken,
                refreshToken,
            };
        } catch (error) {
            console.log(error);
        }
    }
    // Validating access token
    async validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, accessKey);
            return userData;
        } catch (error) {
            console.log(error);
        }
    }
    // Validating refresh token
    async validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, refreshKey);
            return userData;
        } catch (error) {
            console.log(error);
        }
    }
    // Saving refresh token in DB
    async saveToken(userId: string, refreshToken: string) {
        try {
            // Finding token and saving it in DB
            const tokenData = await TokenModel.findOne({ _id: userId });
            if (tokenData) {
                tokenData.token = refreshToken;
                return tokenData.save();
            }

            // Creating token if it doesnt exist
            const token = await TokenModel.create({ user: userId, token: refreshToken });
            return token;
        } catch (error) {
            console.log(error);
        }
    }
    // Removing refresh token from DB
    async removeToken(refreshToken: string) {
        try {
            // Removing token from DB
            const tokenData = await TokenModel.deleteOne({ token: refreshToken });
            return tokenData;
        } catch (error) {
            console.log(error);
        }
    }
    // Finding refresh token in DB
    async findToken(refreshToken: string) {
        try {
            // Finding token in DB
            const tokenData = await TokenModel.findOne({ token: refreshToken });
            return tokenData;
        } catch (error) {
            console.log(error);
        }
    }
}

export const tokenService = new TokenService();
