import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuthStore } from '../../store/userAuthStore'

function Login() {

    const { login } = userAuthStore()

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const validateForm = () => {
        const { email, password } = formData;

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
        <div>
            <h1>Login</h1>
            <label>
                Email:
                <input type="email" name="email" required value={formData.email} onChange={handleChange} />
            </label>
            <label>
                Password:
                <input type="password" name="password" required value={formData.password} onChange={handleChange} />
            </label>
            <button type="submit" onClick={handleSubmit}>Log In</button>
            <p>
                Don't have an account? <Link to={"/signup"}>Sign Up</Link>
            </p>
        </div>
    )
}

export default Login
