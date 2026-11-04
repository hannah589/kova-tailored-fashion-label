import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

//useLocation: returns the location where the user previous came from
function ProtectedRoute() {
  const { getCurrentUser } = useAuth();
  const location = useLocation();

  return getCurrentUser() ? (
    //login
    <Outlet />
  ) : (
    //logout
    //state: the user's previous location saved in state
    <Navigate
      to="/signin"
      state={{
        from: location,
        message: "Please sign in to access this page.",
      }}
      replace
    />
  );
}

export default ProtectedRoute;
