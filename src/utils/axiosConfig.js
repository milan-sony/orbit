import axios from 'axios'
import { userAuthStore } from '../store/userAuthStore'
import { useNavigate } from 'react-router-dom'

// Axios interceptor reference: https://medium.com/@gahrmicc/basic-implementation-of-interceptors-in-react-js-using-axios-222bf0db6c3f

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    withCredentials: true, // Send cookies with every single request
})

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = userAuthStore.getState().accessToken

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config

}, (error) => {
    console.error("Error in request:", error)
    return Promise.reject(error)
})

// Add a response interceptor
axiosInstance.interceptors.response.use((response) => {
    return response; // Return the response as is
}, async (error) => {

    const originalRequest = error.config;

    // If the error is due to an unauthorized access (401 or 403) and the request has not been retried yet, attempt to refresh the token
    if (error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh')) {
        console.error("Response error", error.response);
        originalRequest._retry = true; // Mark this request as "retried"

        // Fetch new access token
        try {
            const refresh_token_url = `${import.meta.env.VITE_APP_API_URL}/auth/refresh`
            const response = await axios.get(refresh_token_url, { withCredentials: true }); // Send a request to refresh the access token with cookies

            const newAccesToken = response.data?.accessToken;

            if (newAccesToken) {
                userAuthStore.setState({ accessToken: newAccesToken }); // Update the accessToken in the Zustand store
                // Update the Authorization header for the retried request
                originalRequest.headers.Authorization = `Bearer ${newAccesToken}`;
            }

            return await axiosInstance(originalRequest);

        } catch (refreshError) {
            // Incase of failed refresh, re-direct to login page
            const navigate = useNavigate(); // If you have React-router-dom
            navigate("/login");
            return await Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
}
);

export default axiosInstance