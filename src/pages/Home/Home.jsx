import Navbar from "../../components/Navbar";
import { userAuthStore } from "../../store/userAuthStore";

function Home() {

    const { isUserAuthenticated, accessToken, user } = userAuthStore()

    console.log("accessToken: ", accessToken)
    console.log("isUserAuthenticated: ", isUserAuthenticated)

    return (
        <>
            <Navbar />
            <p>Hello World!</p>
            <p>User: {JSON.stringify(user)}</p>
            <p>UserID: {user?.userId}</p>
            <p>Token: {accessToken}</p>
            <p>isUserAuthenticated: {isUserAuthenticated}</p>
        </>
    );
}

export default Home;