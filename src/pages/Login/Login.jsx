import { Link } from 'react-router-dom'

function Login() {
    return (
        <div>
            <h1>Login</h1>
            <label>
                Email:
                <input type="email" name="email" required />
            </label>
            <label>
                Password:
                <input type="password" name="password" required />
            </label>
            <button type="submit">Log In</button>
            <p>
                Don't have an account? <Link to={"/signup"}>Sign Up</Link>
            </p>
        </div>
    )
}

export default Login
