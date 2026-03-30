import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuthStore } from "../../store/userAuthStore";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Orbit } from "lucide-react";
import { toast } from "sonner"

function Login() {

    const { login, isLoggingIn } = userAuthStore()

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const validateForm = () => {
        const { email, password } = formData;

        if (!email) {
            toast.info("Email is required", { position: "top-center" })
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.info("Invalid email address", { position: "top-center" });
            return false;
        }

        if (!password) {
            toast.info("Password is required", { position: "top-center" });
            return false;
        }

        if (password.length < 6) {
            toast.info("Password must be at least 6 characters", { position: "top-center" });
            return false;
        }

        return true
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isFormValid = validateForm()
        if (isFormValid === true) {
            login(formData, navigate)
        }
    }

    return (
        <div className="flex items-center justify-center bg-background px-4 py-6">
            <Card className="w-full max-w-md shadow-xl">

                {/* Header */}
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                        <Orbit className="w-8 h-8 hover:animate-spin" />
                    </div>

                    <CardTitle className="text-2xl font-bold">
                        Welcome Back
                    </CardTitle>
                </CardHeader>

                {/* Form */}
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Email */}
                        <div className="space-y-1">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Submit */}
                        {
                            isLoggingIn ? (<Button className="w-full mt-2" type="submit" disabled>
                                <span className="animate-pulse">Logging In...</span>
                            </Button>) : (
                                <Button className="w-full mt-2" type="submit">
                                    Login
                                </Button>
                            )
                        }
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-primary hover:underline font-medium"
                        >
                            Sign Up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login
