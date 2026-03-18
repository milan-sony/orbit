import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuthStore } from "../../store/userAuthStore";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Orbit } from "lucide-react";

function Signup() {

    const { signup, isSigningUp } = userAuthStore();

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const validateForm = () => {
        const { firstName, email, password } = formData;

        if (!firstName) {
            alert("First name is required");
            return false;
        }

        if (!/^[A-Za-z]+$/.test(firstName)) {
            alert("First name must contain only letters");
            return false;
        }

        if (formData.lastName && !/^[A-Za-z]+$/.test(formData.lastName)) {
            alert("Last name must contain only letters");
            return false;
        }

        if (!email) {
            alert("Email is required");
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Invalid email address");
            return false;
        }

        if (!password) {
            alert("Password is required");
            return false;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return false;
        }

        return true;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isFormValid = validateForm()
        if (isFormValid === true) {
            signup(formData, navigate)
        }
    }

    return (
        <>
            <div className="min-h-dvh flex items-center justify-center bg-background px-4 py-6">
                <Card className="w-full max-w-md shadow-xl">
                    <CardHeader className="text-center space-y-4">
                        {/* Logo */}
                        <div className="mx-auto w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                            <Orbit className="w-8 h-8 hover:animate-spin" />
                        </div>

                        <CardTitle className="text-2xl font-bold">
                            Create Account
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* First Name */}
                            <div className="space-y-1">
                                <Label>First Name</Label>
                                <Input
                                    name="firstName"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Last Name */}
                            <div className="space-y-1">
                                <Label>Last Name</Label>
                                <Input
                                    name="lastName"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>

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
                                isSigningUp ? (<Button className="w-full mt-2" type="submit" disabled>
                                    <span className="animate-pulse">Signing Up...</span>
                                </Button>) : (
                                    <Button className="w-full mt-2" type="submit">
                                        Sign Up
                                    </Button>
                                )
                            }
                        </form>

                        {/* Footer */}
                        <p className="text-center text-sm text-muted-foreground mt-6">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-primary hover:underline font-medium"
                            >
                                Login
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Signup
