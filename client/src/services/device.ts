import { api } from './api';

const deviceApi = api.injectEndpoints({
    endpoints: (build) => ({
        getOne: build.query<any, any>({
            query: (id) => ({
                url: '/'
            })
        })
    })
})