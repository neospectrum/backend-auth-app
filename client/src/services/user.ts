import { IUser } from './../models/IUser';
import { api } from './api';

interface IUserAuthData {
    email: string;
    password: string;
}

export interface IUserData {
    _id: string;
    __v: string;
    email: string;
    passwrod: string;
    isActivated: boolean;
    activationLink: string;
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
            transformErrorResponse: (error) => {
                return error.data;
            },
        }),
        login: build.mutation<IUserResponse, IUserAuthData>({
            query: (user: IUserAuthData) => ({
                url: '/user/login',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: () => ['User'],
            transformErrorResponse: (error) => {
                return error.data;
            },
        }),
        logout: build.mutation<any, any>({
            query: () => ({
                url: '/user/logout',
                method: 'POST',
                credentials: 'include',
            }),
            transformErrorResponse: (error) => {
                return error.data;
            },
        }),
        refresh: build.query<any, any>({
            query: () => ({
                url: '/user/refresh',
                credentials: 'include',
            }),
            transformErrorResponse: (error) => {
                return error.data;
            },
        }),
        getUsers: build.query<IUser[], any>({
            query: () => ({
                url: '/user/users',
            }),
            transformResponse: (response: IUserData[]) => {
                const users: IUser[] = response.map(({ email, _id, isActivated }) => ({
                    email,
                    id: _id,
                    isActivated,
                }));

                return users;
            },
            transformErrorResponse: (error) => {
                return error.data;
            },
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
