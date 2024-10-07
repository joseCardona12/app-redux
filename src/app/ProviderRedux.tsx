"use client"
import { Provider } from "react-redux";
import {store, persist}from "../redux/index";
import { PersistGate } from "redux-persist/integration/react";

export default function ProviderRedux({ children }: { children: React.ReactNode }) {
    return(
    <Provider store={store}>
        <PersistGate persistor={persist}>
            {children}
        </PersistGate>
    </Provider>
    );
}