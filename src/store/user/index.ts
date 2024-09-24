import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { AxiosClient } from '../../APIs/axiosClient'

export interface User {
    name: string,
    username: string,
    phone: string | null,
    address: string | null
}

const userInitValue: User = {
    name: '',
    username: '',
    phone: '',
    address: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitValue,
    reducers: {
        // saveUser: (state, action: PayloadAction<User>) => {
        //     state.address = action.payload.address
        //     state.name = action.payload.name
        //     state.phone = action.payload.phone
        //     state.username = action.payload.username
        // },
        deleteUser: (state) => {
            state = { ...state, ...userInitValue }
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
        },
    },
    extraReducers: (builder) => {
        builder.addCase(LoginAPI.pending, (state) => {
            state = { ...state, ...userInitValue }
        }).addCase(LoginAPI.fulfilled, (state, action) => {
            state.address = action.payload.address
            state.name = action.payload.name
            state.phone = action.payload.phone
            state.username = action.payload.username
        }).addCase(LoginAPI.rejected, (state) => {
            state = { ...state, ...userInitValue }
        }).addCase(TestToken.fulfilled, (state, action) => {
            state = { ...state, ...action.payload }
        }).addCase(TestToken.rejected, (state) => {state = { ...state, ...userInitValue }})
    }
})


export const LoginAPI = createAsyncThunk('user/login',
    async (credentialInfo: { username: string, password: string }) => {
        try {
            const res = (await AxiosClient.post('/login', {
                username: credentialInfo.username,
                password: credentialInfo.password
            }))
            if(res.status === 401){
                throw new Error("User not found")
            }
            localStorage.setItem('access', res.data.access)
            localStorage.setItem('refresh', res.data.refresh)
            return res.data.user as User
        }
        catch (err: any) {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            if (err.message === "User not found") {
                throw new Error("User not found")
            }
            throw new Error("Internal error, please try again later")
        }
    }
)

export const UpdateUserAPI = createAsyncThunk('user/update',
    async (user: User): Promise<User> => {
        return (await AxiosClient.put('/update', {
            ...user
        }) as User)
    }
)

export const TestToken = createAsyncThunk('user/verifyToken',
    async (): Promise<User> => {
        return (await AxiosClient.get('/user')).data as User
    }
)

export const { deleteUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer