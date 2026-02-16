import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { AuthContext } from "../context/AuthProvider";

export default function Log() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLog = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/api/logs/${id}`,
        { withCredentials: true }
      );

      setLog(res.data.log);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load log");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLog();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <Sidebar profile={user} />
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            <TopBar />

            <div className="h-[calc(100vh-180px)] overflow-y-auto px-3">

              {loading && (
                <div className="text-center text-white/40 mt-10">
                  Loading log...
                </div>
              )}

              {error && (
                <div className="text-center text-red-400 mt-10">
                  {error}
                </div>
              )}

              {log && (
                <div className="rounded-3xl bg-white/10 backdrop-blur-xl
                  border border-white/10 p-6 shadow-lg space-y-6">

                  {/* Title */}
                  <div>
                    <h1 className="text-3xl font-bold">{log.title}</h1>
                    <div className="text-xs text-white/50 mt-1">
                      {new Date(log.createdAt).toLocaleString("en-IN")}
                    </div>
                  </div>

                  {/* Privacy */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      log.isPrivate
                        ? "bg-red-500/10 text-red-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                  >
                    {log.isPrivate ? "Private" : "Public"}
                  </span>

                  {/* Description */}
                  <div className="text-white/80 leading-relaxed text-base">
                    {log.description}
                  </div>

                  {/* User Info */}
                  <div className="border-t border-white/10 pt-6 flex justify-between items-center">

                    <div
                      onClick={() => navigate(`/profile/${log.user._id}`)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold">
                        {log.user?.name?.[0]}
                      </div>

                      <div>
                        <div className="text-sm font-semibold">
                          {log.user?.name}
                        </div>
                        <div className="text-xs text-white/50">
                          {log.user?.email}
                        </div>
                        <div className="text-xs text-cyan-400">
                          ⭐ {log.user?.totalPoints ?? 0} pts
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/profile/${log.user._id}`)}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                    >
                      View Profile →
                    </button>

                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
