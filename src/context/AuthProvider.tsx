import type { User } from "@/types/user";
import { useState } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";
import { login } from "@/api/user-api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    

    const handleLogin = async (email: string, password: string): Promise<User | null> => {
        try {
            const user = await login(email, password);

            setUser(user as User);
            navigate("/dashboard");
            return user as User;
        } catch (err) {
            toast.error(`Gagal Login: ${err}`);
            return null;
        }

    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    const value: AuthContextType = {
        user,
        handleLogin,
        logout,
        isAuthenticated: !!user,
        setUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};