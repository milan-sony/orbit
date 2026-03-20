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

// Set tasks
export async function setTasks(params) {
    try {
        const response = await axiosInstance.post("/tasks/setTasks", params)
        return response.data
    } catch (error) {
        return error?.response?.data
    }
}

// Get all tasks
export async function getAllTasks() {
    try {
        const response = await axiosInstance.get("/tasks/getTasks")
        return response.data
    } catch (error) {
        return error?.response?.data
    }
}

// Update tasks
export async function updateTasks(params) {
    try {
        const response = await axiosInstance.put("/tasks/updateTasks", params)
        return response.data
    } catch (error) {
        return error?.response?.data
    }
}

// Update tasks
export async function deleteTasks(params) {
    try {
        const response = await axiosInstance.delete(`/tasks/deleteTasks/${params}`)
        return response.data
    } catch (error) {
        return error?.response?.data
    }
}