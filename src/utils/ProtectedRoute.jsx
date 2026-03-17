import { useEffect } from "react";
import { userAuthStore } from "../store/userAuthStore";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isUserAuthenticated, user } = userAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isUserAuthenticated || !user) {
            navigate("/login")
        }
    }, [isUserAuthenticated, user, navigate])

    return children
}

export default ProtectedRoute