# PROYECTO NEXT USANDO REDUX

## PRIMER PASO
Crear una carpeta al mismo nivel de app
__redux__ y dentro de ella craer un archivo __index.ts__

## SEGUNDO PASO
Crear una carpeta slices y sus respectivos archivos slices

```
slices - Folder
userSlicer.ts
coderSlice.ts
AuthSlice.ts
...
```

## TERCER PASO 
Instalar las dependencias

```
npm install @reduxjs/toolkit 
npm install react-redux
```

## CUARTO PASO
Configurar la store sin permanencia
```
import { configureStore, Store } from "@reduxjs/toolkit";

const store:Store = configureStore({
    reducer: {
        user: 
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

## QUINTO PASO
Dentro de la carpeta slices, se debe
crear los respectivos archivos slices y configurarlos

## SEXTO PASO
Importar createSlice
```
import { createSlice } from "@reduxjs/toolkit";
```

## SÉPTIMO PASO
Crear la interfaz para el slices
```
interface IUser {
    name:string,
    email:string,
    token:string
}

interface IAuthState {
    user: IUser,
    isAuthenticated:boolean,
    error: null | string,
    loading: boolean
};
```

## OCTAVO PASO
Crear el Estado inicial de la interfaz
```
const AuthStateInitial: IAuthState = {
    user: {
        name: "",
        email: "",
        token: ""
    },
    isAuthenticated: false,
    error: null,
    loading: false
};
```

## OCTAVO PASO
Crear el slices
```
const authSlice = createSlice({
    name: "auth",
    initialState: AuthStateInitial,
    reducers: {
        setUser(state, action: PayloadAction<IUser>): void{
            state.user = action.payload
            state.isAuthenticated = true
            state.error = null
            state.loading = false
        }
    }
});

```

## NOVENO PASO
Exportar los actions y reducers
```
export const {setUser} = authSlice.actions;
export default authSlice.reducer;
```

## DÉCIMO PASO
Crear el el ProviderRedux que contenga la app

- Crear dentro de la carpeta App un archivo ProviderRedux.tsx
```
"use client"
import { Provider } from "react-redux";
import {store} from "../redux/index";

export default function ProviderRedux({ children }: { children: React.ReactNode }) {
    return(
    <Provider store={store}>
        {children}
    </Provider>
    );
}
```

## ONCEAVO PASO
Incorporar en el layout el providerRedux
```
<ProviderRedux>
    {children}
</ProviderRedux>
```

### DOCEAVO PASO
Crear el componente o page/view para el login 
```
"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/index";
import { IUser } from "@/interfaces/userInterface";
import { setAuth } from "@/redux/slices/authSlice";
import React, { useState } from "react";

export default function HomeView():React.ReactNode{
  const dispatch: AppDispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state);
  console.log(auth);
  const initialState: IUser = {
    name: "",
    email: "",
    password: ""
  }
  const [user, setUser] = useState<IUser>(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void =>{
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    });
  }

  const handleLogin = ():void =>{
    console.log(user);
    dispatch(setAuth(user));
    console.log(auth);
  }
  return(
    <form>
      <input type="text" name="name" onChange={(e)=>handleChange(e)} />
      <input type="email" name="email" onChange={(e)=>handleChange(e)} />
      <input type="password" name="password" onChange={(e)=>handleChange(e)} />
      <input type="button" value={"Login"} onClick={handleLogin}/>
    </form>
  )
}
```

### Store
Es el espacio donde vamos a guardar los estados
### Slices
Es cada uno de nuestros estados, son particiones. Por ejemplo: userSlice, authSlice, 
### Reducers
Es el intermediario entre entre el store y el actions, el decide si se cambia algo en el store
### Actions
Es la acción, la función que cambia el estado en el store
### Dispatch 
Es el ejecutador de la acción.

### Flujo 
- STORE - SLICES - RECUDERS - ACTIONS - DISPATCH
- DISPATCH - ACTIONS - REDUCERS - STORE

## CONFIGURACIÓN DEL STORE CON PERMANENCIA

### PROVIDER
```
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
```

### STORE
```
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
```