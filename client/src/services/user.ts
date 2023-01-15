import { api } from './api';

const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<any, any>({
            query: () => ({
                url: '/',
            }),
        }),
    }),
});

export const { useGetUsersQuery } = userApi;
