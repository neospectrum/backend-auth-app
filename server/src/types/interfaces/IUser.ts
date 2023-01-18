interface IUser {
    id: string;
    email: string;
    isActivated: boolean;
}

export interface IUserData {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface UserAuthData {
    email: string;
    password: string;
}

export interface UserRefreshToken {
    refreshToken: string;
}
