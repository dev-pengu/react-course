import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
    isAuthenticated: boolean;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
    } satisfies AuthState as AuthState,
    reducers: {
        login: (state, action: PayloadAction<{username: string, password: string}>) => {
            console.log('Logging in with', action.payload);
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;