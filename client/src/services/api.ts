import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('token');
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
