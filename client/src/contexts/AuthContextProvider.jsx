import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

//import context define in context
import { AuthContext } from "./AuthContext"

export function AuthContextProvider({ children }) {

  //user object: user data 
  //login: keep token persistent in local storage 
  //getCurrentUser: get the user who is logged in 
  //logout: wipe out the user token 

  //create states
  const [user, setUser] = useState(null);

   // call logged-in user every page mount
  useEffect(() => {
    const userData = getCurrentUser();
    setUser(userData);
  }, []);
  
  //create functions
 // Save user and token after login into local storage
  async function login(data){
    // save the user's jwt token in localStorage
    const { token } = data;
    localStorage.setItem("token", token);
    setUser(jwtDecode(token));
  }

  async function getCurrentUser(){
    try{
      const token = localStorage.getItem("token");
      const savedUser = jwtDecode(token);
      return savedUser;

    } catch(error){
      return null;
    }
  }

   // Clear user and token after logout
  function logout(){
    localStorage.removeItem("user");
    setUser(null);
  }

  //return reusable state and functions
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        getCurrentUser,
        logout, 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
