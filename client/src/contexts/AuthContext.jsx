import { createContext, useContext } from 'react';

export const AuthContext = createContext();

//create custom hook 
export const useAuth = () => {
  return useContext(AuthContext)
};


