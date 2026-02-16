import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Log from "./pages/Log";
import Wins from "./pages/Wins";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

export default function IndexRoutes() {
    
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
      <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logs/:id" element={<ProtectedRoute><Log /></ProtectedRoute>} />
      <Route path="/wins" element={<ProtectedRoute><Wins/></ProtectedRoute>} />
      <Route path="/*" element={<NotFound/>} />

    </Routes>
  );
}
