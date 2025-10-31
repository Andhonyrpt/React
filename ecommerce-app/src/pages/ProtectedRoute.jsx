import { isAuthenticated } from "../utils/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

    return isAuthenticated() ? children : <Navigate to="/login" />
};