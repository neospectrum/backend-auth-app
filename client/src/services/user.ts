import { IUser } from '../models/IUser';
import { api } from './api';

interface IUserAuthData {
    email: string;
    password: string;
}

export interface IUserResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        registration: build.mutation<IUserResponse, IUserAuthData>({
            query: (user: IUserAuthData) => ({
                url: '/user/registration',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: () => ['User'],
        }),
        login: build.mutation<IUserResponse, IUserAuthData>({
            query: (user: IUserAuthData) => ({
                url: '/user/login',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: () => ['User'],
        }),
        logout: build.mutation<any, any>({
            query: () => ({
                url: '/user/logout',
                method: 'POST',
                credentials: 'include',
            }),
        }),
        refresh: build.query<any, any>({
            query: () => ({
                url: '/user/refresh',
                credentials: 'include',
            }),
        }),
        getUsers: build.query<IUser[], any>({
            query: () => ({
                url: '/user/users',
            }),
        }),
    }),
});

export const {
    useGetUsersQuery,
    useRegistrationMutation,
    useLoginMutation,
    useLazyRefreshQuery,
    useLogoutMutation,
} = userApi;
