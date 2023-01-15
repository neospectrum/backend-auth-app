import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';

interface UserState {
    email: string;
    isAuth: boolean;
}

const initialState: UserState = {
    email: '',
    isAuth: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<IUser>) => {
            state.email = action.payload.email;
            state.isAuth = true;
        },
        logOut: () => {},
    },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
