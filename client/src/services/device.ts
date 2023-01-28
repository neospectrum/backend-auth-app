import { api } from './api';

const deviceApi = api.injectEndpoints({
    endpoints: (build) => ({
        getOne: build.query<any, any>({
            query: (name) => ({
                url: `/${name}`
            })
        }),
        getAll: build.query<any, any>({
            query: () => ({
                url: '/'
            })
        }),
        createDevice: build.mutation<any, any>({
            query: () => ({
                url: '/',
                method: 'POST'
            })
        }),
        updateDevice: build.mutation<any, any>({
            query: () => ({
                url: '/',
                method: 'PATCH'
            })
        }),
        deleteDevice: build.mutation<any, any>({
            query: () => ({
                url: '/',
                method: 'DELETE'
            })
        })
    })
})