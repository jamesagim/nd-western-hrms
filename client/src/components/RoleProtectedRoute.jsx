import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(admin?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleProtectedRoute;