import { IUser } from './../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserResponse } from '../../services/user';

interface UserState {
    id: string;
    email: string;
    isActivated: boolean;
    isAuth: boolean;
    token: string;
}

const initialState: UserState = {
    id: '',
    email: '',
    isActivated: false,
    isAuth: false,
    token: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            const user = action.payload;

            state.id = user.id;
            state.email = user.email;
            state.isActivated = user.isActivated;
        },
        signIn: (state, action: PayloadAction<IUserResponse>) => {
            const { accessToken, user } = action.payload;
            localStorage.setItem('token', JSON.stringify(accessToken));

            setUser(user);
            state.isAuth = true;
            state.token = accessToken;
        },
        logOut: () => {
            localStorage.removeItem('token');
            return initialState;
        },
        checkAuth: (state, action: PayloadAction<IUserResponse>) => {
            const { accessToken, user } = action.payload;
            localStorage.setItem('token', JSON.stringify(accessToken));

            setUser(user);
            state.isAuth = true;
        },
    },
});

export const { setUser, signIn, logOut, checkAuth } = userSlice.actions;
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
