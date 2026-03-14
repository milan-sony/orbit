import { create } from "zustand";
import { userSignup } from "../utils/api";

export const userAuthStore = create((set) => ({

    user: null,
    accessToken: null,
    isUserAuthenticated: false,
    isLoading: true,
    isSigningUp: false,
    isLoggingIn: false,

    signup: async (userData) => {
        set({ isSigningUp: true })
        try {
            const response = await userSignup(userData)
            console.log("User signup response: ", response)
        } catch (error) {
            console.error("Error signing up the user, ", error)
        } finally {
            set({ isSigningUp: false })
        }
    }

}))