import { configureStore, Store } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistStore, persistReducer} from "redux-persist";
import rootReducer from "./slices";

const persistConfig = {
    key: "root",
    storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer
})

export const persist = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch