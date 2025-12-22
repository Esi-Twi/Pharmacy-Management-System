import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from './AuthContext'



const PublicRoute = () => {
    const { user, token } = useAuth();

    if (!user || !token) return <Navigate to="/login" replace />;

    // if (user.role === "Admin") return <Navigate to="/dashboard" replace />;
    // if (user.role === "Pharmacist") return <Navigate to="/create-sales" replace />;

    return <Outlet /> ;
};


export default PublicRoute
