import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function ProtectedRoute() {
  //useLocation: returns the location where the user previous came from
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  //check user is logged in with a token and is admin, gives access to the protected routes
  return (user && isAdmin) ? (
    <Outlet />
  ) : (
    // if not, navigate to login
    //state: the user's previous location saved in state
    <Navigate
      to="/signin"
      state={{
        from: location,
        message: "Please sign in to continue.",
      }}
      replace
    />
  );
}

export default ProtectedRoute;
