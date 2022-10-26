import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import authApiService from './authApiRequests'

//Get user from local storage 
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    currentUser: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: "",
}

//register user thunk
export const registerUserThunk = createAsyncThunk("auth/register",
async(userData, thunkAPI)=>{
    try {
       const response = await axios.post("/auth/register", userData) 
       return response.data
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})


//login user thunk
export const loginUserThunk = createAsyncThunk("auth/login",
async(userData, thunkAPI)=>{
    try {
        return await authApiService.login(userData)
    
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

//logout user thunk
export const logoutUserThunk = createAsyncThunk("auth/logout",
async(userData, thunkAPI)=>{
    try {
       await axios.post("/auth/logout") 
       localStorage.removeItem("user")

    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

export const userSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.errorMessage = ""
            state.isLoading = false
        },
    },

    extraReducers:(builder)=>{
        builder
        .addCase(registerUserThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(registerUserThunk.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(registerUserThunk.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.payload

        })
        .addCase(loginUserThunk.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(loginUserThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.currentUser = action.payload
        })
        .addCase(loginUserThunk.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.payload
            state.currentUser = null
        })
        .addCase(logoutUserThunk.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(logoutUserThunk.fulfilled, (state)=>{
            state.currentUser = null
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(logoutUserThunk.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.payload
        })
        
    }
})

export const { reset} = userSlice.actions
export default userSlice.reducer