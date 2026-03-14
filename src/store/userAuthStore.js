import { create } from "zustand";
import { userLogin, userSignup } from "../utils/api";

export const userAuthStore = create((set) => ({

    user: null,
    accessToken: null,
    isUserAuthenticated: false,
    isLoading: true,
    isSigningUp: false,
    isLoggingIn: false,

    signup: async (userSignupData, navigate) => {
        set({ isSigningUp: true })
        try {
            const signupResponse = await userSignup(userSignupData)
            console.log("Signup response: ", signupResponse)
            if (signupResponse?.status === 201) {
                // Create login parameters for skipping the login page in signing up
                const userLoginData = {
                    email: userSignupData.email,
                    password: userSignupData.password
                }

                console.log("userLoginData from signup: ", userLoginData)

                const loginResponse = await userLogin(userLoginData)
                console.log("Login response from signup: ", loginResponse)

                if (loginResponse?.status === 200) {
                    set({
                        user: loginResponse?.data,
                        accessToken: loginResponse?.token,
                        isUserAuthenticated: true
                    })
                    alert(loginResponse?.message)
                    navigate("/home")
                    return
                } else {
                    alert(loginResponse?.message)
                    return
                }
            } else {
                alert(signupResponse?.message)
                return
            }
        } catch (error) {
            console.error("Error signing up the user, ", error)
        } finally {
            set({ isSigningUp: false })
        }
    }
}))