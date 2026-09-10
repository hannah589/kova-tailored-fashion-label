import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Replace browser history so the user can't go back to the protected page
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;