import { configureStore, Store } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
const store:Store = configureStore({
    reducer: {
        auth: authReducer 
    }
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch