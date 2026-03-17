import axiosInstance from "./axiosConfig";

// User signup
export async function userSignup(userSignupData) {
    try {
        const response = await axiosInstance.post("/auth/signup", userSignupData)
        return response.data
    } catch (error) {
        return error?.response?.data
    }
}

// User login
export async function userLogin(userLoginData) {
    try {
        const response = await axiosInstance.post("/auth/login", userLoginData)
        return response.data
    } catch (error) {
        return error?.response?.data
    }
}

// User logout
export async function userLogout() {
    try {
        const response = await axiosInstance.post("/auth/logout")
        return response.data
    } catch (error) {
        return error?.response?.data
    }
}