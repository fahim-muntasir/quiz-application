import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
    const isLoggedIn = useAuth();

    const content = isLoggedIn ? children : <Navigate to="/" replace={true} />;

    return content;
}
