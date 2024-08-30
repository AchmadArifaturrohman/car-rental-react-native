import { createSlice } from "@reduxjs/toolkit";
import { authLogin } from "./authApi";
import { getUser, saveUser } from "@/components/GetUser"


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        user: getUser() ? getUser() : null,
        isError: false,
        isLoginSuccess: false,
        errorMessage: null,
        isModalVisible: false,
    },
    reducers: {
        closeModal: (state) => {
            state.isModalVisible = false;
            state.isError = false;
            state.errorMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authLogin.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = null;
            state.isLoginSuccess = false;
            
        });
        builder.addCase(authLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoginSuccess = true;
                state.user = {
                    email: action.payload.email,
                    role: action.payload.role,
                    token: action.payload.access_token
                };
                state.isError = false;
                state.errorMessage = null;
                state.isModalVisible = true;
                saveUser(action.payload);
        });
        builder.addCase(authLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isLoginSuccess = false;
            state.errorMessage = action.payload || "An error occurred";
            state.isModalVisible = true;
        });
    },
});


export const postAuthLogin = authLogin;
export const { closeModal } = authSlice.actions; //export action closeModal
export const selectAuthLogin = state => state.login;
export const newAuthLogin = authSlice.reducer;