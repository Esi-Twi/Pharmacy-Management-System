import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'


function ProtectedRoutes({ children, allowedRoles }) {
  const {user} = useAuth()

  if (!user) return <Navigate to='/login' />

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to='/unauthorized' />
  }

  return children;
}

export default ProtectedRoutes