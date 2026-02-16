import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from './context/AuthProvider'
import { useContext, useEffect } from "react";
import Profile from "./pages/Profile";
import IndexRoutes from "./IndexRoutes";
import { Loader2 } from "lucide-react";
import { Toaster } from "react-hot-toast";
export default function App(){
  const { loading } = useContext(AuthContext)

    if (loading) {
       return (
      <div className="text-white flex justify-center items-center w-full h-screen gap-3">
       <div>
          <Loader2 className="animate-spin"></Loader2>
        </div>
        <h1>
           Loading...   
        </h1>
        
      </div>);
    }

  return (
  <>
  <IndexRoutes />
   <Toaster />
  </>
);
}