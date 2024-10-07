import { IUser } from "@/interfaces/userInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
    user: IUser,
    isAuthenticated:boolean,
    error: null | string,
    loading: boolean
};

const AuthStateInitial: IAuthState = {
    user: {
        name: "",
        email: "",
        password: ""
    },
    isAuthenticated: false,
    error: null,
    loading: false
};

const authSlice = createSlice({
    name: "auth",
    initialState: AuthStateInitial,
    reducers: {
        setAuth(state, action: PayloadAction<IUser>): void{
            state.user = action.payload
            state.isAuthenticated = true
            state.error = null
            state.loading = false
        },
    }
});

export const {setAuth} = authSlice.actions;
export default authSlice.reducer;
