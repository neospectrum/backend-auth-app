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
