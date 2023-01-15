import { combineReducers, configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { userActions, userReducer } from './slices/userSlice';
import { api } from './../services/api';

export const rootActions = {
    ...userActions,
};
const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    user: userReducer,
});

export const setupStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
        ...options,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
