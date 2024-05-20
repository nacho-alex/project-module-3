import { createContext, useEffect, useState } from "react";
import { deleteUser, getProfile, login, logout, updateUser } from "../services/api.service";
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
      await fetchProfile();
    } catch {
      throw new Error(); 
    }  
  }

  function doLogout() {
    setUser(null);
    logout();
    navigate("/login");
  }

  async function doUpdate(data) {
    try {
      await updateUser(data);
      await fetchProfile();
    } catch {
      throw new Error();
    }
  }

  async function doDelete(id) {
    try {
      await deleteUser(id);
      navigate("/login");
    } catch {
      throw new Error();
    }
  }

  const value = {
    user,
    doLogin,
    doLogout,
    doUpdate,
    doDelete
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;