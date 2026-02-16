import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.get("/users/me", { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading}}>
      {children}
    </AuthContext.Provider>
  );
};
