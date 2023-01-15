import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: () => {},
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 5 });

export const api = createApi({
    baseQuery: baseQueryWithRetry,
    tagTypes: ['User'],
    endpoints: () => ({}),
});
