import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Logout from "../components/Logout";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);

      try {
        // Fetch user (critical)
        const userRes = await axios.get(`/users/${id}`, {
          withCredentials: true,
        });

        setUser(userRes.data.user);
      } catch (err) {
        setError("Failed to load profile");
        setLoading(false);
        return;
      }

      try {
        // Fetch logs (non-critical)
        const logsRes = await axios.get(`/logs/users/${id}`, {
          withCredentials: true,
        });

        setLogs(logsRes.data.logs || []);
      } catch (err) {
        setLogs([]);
      }

      setLoading(false);
    };

    fetchProfileData();
  }, [id]);

  // 🔁 Toggle Privacy
  const togglePrivacy = async (e, logId, currentValue) => {
    e.stopPropagation(); // 🚫 prevent redirect

    try {
      await axios.patch(
        `/logs/${logId}`,
        { isPrivate: !currentValue },
        { withCredentials: true }
      );

      // Update UI instantly
      setLogs((prev) =>
        prev.map((log) =>
          log._id === logId
            ? { ...log, isPrivate: !currentValue }
            : log
        )
      );
    } catch (err) {
      console.error("Privacy update failed", err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading Profile...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-400">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
      <Logout />
        {/* Profile Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-linear-to-br from-cyan-400 via-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold">
              {user?.name?.[0]}
            </div>

            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-white/50">{user?.email}</p>
              <p className="text-cyan-400 mt-2 font-semibold">
                Total Points: {user?.totalPoints}
              </p>
            </div>
          </div>
        </div>

        {/* Logs Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Activity Logs</h2>

          {logs.length === 0 ? (
            <div className="text-white/40">
              No logs found.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {logs.map((log) => (
                <div
                  key={log._id}
                  onClick={() => navigate(`/logs/${log._id}`)}
                  className="cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition"
                >
                  <div className="flex justify-between items-start">

                    <div>
                      <h3 className="font-semibold text-lg">
                        {log.title}
                      </h3>
                      <p className="text-white/60 text-sm mt-2">
                        {log.description}
                      </p>
                    </div>

                    {/* Toggle Button */}
                    <button
                      onClick={(e) =>
                        togglePrivacy(e, log._id, log.isPrivate)
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        log.isPrivate
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          log.isPrivate
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>

                  </div>

                  <div className="mt-4 flex justify-between text-xs text-white/40">
                    <span>
                      {new Date(log.createdAt).toLocaleDateString()}
                    </span>

                    {log.isPrivate ? (
                      <span className="text-red-400">
                        🔒 Private
                      </span>
                    ) : (
                      <span className="text-green-400">
                        🌍 Public
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
