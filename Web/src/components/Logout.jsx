import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

export default function Logout() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await toast.promise(
        axios.post("/users/logout", {}, { withCredentials: true }),
        {
          loading: "Logging out...",
          success: "Logged out successfully 👋",
          error: "Something went wrong",
        }
      );

      setUser(null);
      navigate("/login", { replace: true });

    } catch (error) {
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl bg-red-500/20 border border-red-500/40 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/30 transition"
    >
      Logout
    </button>
  );
}
