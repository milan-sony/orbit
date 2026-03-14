import axiosInstance from "./axiosConfig";

export async function userSignup(userData) {
    const response = await axiosInstance.post("/auth/signup", userData)
    return response.data
}