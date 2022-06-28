import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../services/interfaces/user.interface"
import { RootState } from "../store";

type AuthState = {
    user: User | null
    token: string | null
}



const authSlice = createSlice({
    name: "auth",
    initialState: {user: null, token: null} as AuthState,
    reducers: {
        setCredentials : (
            state,
            {payload: {user, token}} : PayloadAction<{user: User | null, token: string | null}>
        ) => {
            state.user = user
            state.token = token
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token',token!)
        },
        resetCredentials : ( state ) =>{
            state.user = null
            state.token = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
    },
})

export const { setCredentials, resetCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user