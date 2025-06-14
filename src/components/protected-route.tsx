// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
    const { user, setUser } = useAuth();
    const [isInit, setInit] = useState<boolean>(true);

    useEffect(() => {
        if(isInit){
            const storedUser = localStorage.getItem("user");
        console.log("StoredUser", storedUser);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setInit(false);
        }
        
    }, [setUser,isInit, setInit]);

    if (user == null) {
        return <div>Loading ...</div>
    }
    if (isInit == false && user == null) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;