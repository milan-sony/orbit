import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { userAuthStore } from "../../store/userAuthStore";

function Home() {

    const { isUserAuthenticated, accessToken, user, logout } = userAuthStore()

    const navigate = useNavigate()

    console.log("accessToken: ", accessToken)
    console.log("isUserAuthenticated: ", isUserAuthenticated)
    console.log("User: ", user)

    const handleLogout = () => {
        logout(navigate)
    }

    return (
        <>
            <Navbar />
            <p>Hello World!</p>
            <p>User: {JSON.stringify(user)}</p>
            <p>UserID: {user?.userId}</p>
            <p>Token: {accessToken}</p>
            <p>isUserAuthenticated: {isUserAuthenticated}</p>
            <button onClick={handleLogout}>Logout</button>

        </>
    );
}

export default Home;