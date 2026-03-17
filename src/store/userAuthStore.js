import { create } from "zustand";
import { userLogin, userLogout, userSignup } from "../utils/api";
import { persist, createJSONStorage } from "zustand/middleware";

export const userAuthStore = create(
    persist(
        (set) => ({

            user: null,
            accessToken: null,
            isUserAuthenticated: false,
            isSigningUp: false,
            isLoggingIn: false,
            isLoggedOut: false,

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
            },

            login: async (userLoginData, navigate) => {
                set({ isLoggingIn: true })
                try {
                    const loginResponse = await userLogin(userLoginData)
                    console.log("Login response: ", loginResponse)
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
                    }
                } catch (error) {
                    console.error("Error logging up the user: ", error)
                } finally {
                    set({ isLoggingIn: false })
                }
            },

            logout: async (navigate) => {
                set({ isLoggedOut: true })
                try {
                    const logoutResponse = await userLogout()
                    console.log("Logout response: ", logoutResponse)
                    if (logoutResponse?.status === 200) {
                        set({
                            user: null,
                            accessToken: null,
                            isUserAuthenticated: false,
                        });
                        localStorage.removeItem("user-auth");  // Clears the persisted state by key
                        alert(logoutResponse?.message)
                        navigate("/login")
                        return
                    } else {
                        alert(logoutResponse?.message)
                    }
                } catch (error) {
                    console.error("Error logging out the user", error)
                } finally {
                    set({ isLoggedOut: false })
                }
            },
        }),
        {
            name: "user-auth", // Name is going to be the key used to store your Zustand state in the storage
            storage: createJSONStorage(() => localStorage), // Enables you to use your own storage by default is localStorage
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                isUserAuthenticated: state.isUserAuthenticated
            }) // Partialize enables you to pick some of the state's fields to be stored in the storage.
        },
    )
);