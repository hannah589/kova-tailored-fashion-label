//import context define in context
import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { setHeaderToken } from "../api/api";

export function AuthContextProvider({ children }) {
  //user object: user data
  //login: keep token persistent in local storage
  //getCurrentUser: get the user who is logged in
  //logout: wipe out the user token

  //create states
  const [user, setUser] = useState(null);

  //check logged-in user when the app first loads
  useEffect(() => {
    async function initialiseAuth() {
      const userData = await getLoggedInUser();
      setUser(userData);
    }

    initialiseAuth();
  }, []);

  //create functions
  // Save user and token after login into local storage
  async function login(data) {
     console.log("Login data:", data);
  console.log("Token:", data?.token);
  console.log("Token type:", typeof data?.token);

    // save the user's jwt token in localStorage
    const { token } = data;
    localStorage.setItem("token", token);
    setHeaderToken();
    setUser(jwtDecode(token));
  }

  // check user is login and has a token
  async function getLoggedInUser() {
    try {
      //get token from header
      const token = localStorage.getItem("token");
      //if no token return null
      if (!token) return null;
      //if no token. jwtDecode will throw an error. save token 
      const savedUser = jwtDecode(token);
      return savedUser;
    } catch (error) {
      return null;
    }
  }

  // Clear user and token after logout
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setHeaderToken();
  }

  //return reusable state and functions
  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.isAdmin === true,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
