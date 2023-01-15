import { userActions, userReducer } from './slices/userSlice';
import { combineReducers, configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';

export const rootActions = {
    ...userActions,
};
const rootReducer = combineReducers({
    user: userReducer,
});

export const setupStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) => {
    return configureStore({
        reducer: rootReducer,
        ...options,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
