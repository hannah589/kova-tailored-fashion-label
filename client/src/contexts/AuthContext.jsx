import { createContext, useContext, useState} from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null) 
  const isLoggedIn = user !== null;

  function login(userData){
    setUser(userData)
  }

  function logout(){
    setUser(null)
  }

  const value = { user, isLoggedIn, login, logout}
  
  return(
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider> 
  )
}


//custom useAuth hook to use islogin to 
export function useAuth(){
  return useContext(AuthContext)
}

