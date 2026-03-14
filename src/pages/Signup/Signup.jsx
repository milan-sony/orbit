import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuthStore } from '../../store/userAuthStore';

function Signup() {

    const { signup } = userAuthStore();

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
            signup(formData)
            navigate("/home")
        }
    }

    return (
        <>
            <h1>Signup</h1>
            <label>
                First Name:
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </label>
            <label>
                Last Name:
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" required value={formData.email} onChange={handleChange} />
            </label>
            <label>
                Password:
                <input type="password" name="password" required value={formData.password} onChange={handleChange} />
            </label>
            <button type="submit" onClick={handleSubmit}>Sign Up</button>
            <p>
                Already have an account? <Link to={"/login"}>Login</Link>
            </p>
        </>
    )
}

export default Signup
