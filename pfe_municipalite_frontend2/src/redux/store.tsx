import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import authReducer from './features/authSlice';
import vehiculeReducer from "./features/vehicules/index";
import vehiculesReducer from "./features/vehicules/vehicules";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        vehicule: vehiculeReducer,
        vehicules: vehiculesReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck:false}).concat(api.middleware),
    
})

export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch