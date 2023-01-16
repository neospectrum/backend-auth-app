import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (getState() as RootState).user.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include',
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 5 });

export const api = createApi({
    baseQuery: baseQueryWithRetry,
    tagTypes: ['User'],
    endpoints: () => ({}),
});
