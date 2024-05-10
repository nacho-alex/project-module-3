import { createContext, useEffect, useState } from "react";
import { getProfile, login, logout } from "../services/api.service";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  async function fetchProfile() {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      setUser(null);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchProfile();
    else setUser(null);
  }, []);

  async function doLogin(data) {
    try {
      await login(data);
      fetchProfile();
    } catch {
      console.log('error')
    }  
    
    
  }

  function doLogout() {
    setUser(null);
    logout();
    navigate("/login");
  }

  const value = {
    user,
    doLogin,
    doLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;