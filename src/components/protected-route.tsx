// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = () => {
    const { user, setUser, isAuthenticated } = useAuth();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        console.log("StoredUser", storedUser);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser]);

    if (user == null) {
        return <div>Loading ...</div>
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;