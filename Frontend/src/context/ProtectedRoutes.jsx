import { Navigate } from "react-router-dom";
import { useAuth } from './AuthContext'


function ProtectedRoutes({ children, allowedRoles }) {
  const { user, token } = useAuth()

  if (!user || !token) return <Navigate to='/login' replace />


  if (!allowedRoles.includes(user.role)) {
    return <Navigate to='*' />
  }

  return children;
}

export default ProtectedRoutes