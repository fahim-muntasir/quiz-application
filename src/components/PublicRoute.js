import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
    const isLoggedIn = useAuth();

    const content = !isLoggedIn ? (
        children
    ) : (
        <Navigate to="/dashboard" replace={true} />
    );

    return content;
}
