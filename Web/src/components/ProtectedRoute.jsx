import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
     return navigate("/login")   
    }
  },[user, navigate])

  return children;
}
