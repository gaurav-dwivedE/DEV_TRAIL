import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { AuthContext } from "../context/AuthProvider";

export default function Wins() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [leaderboard, setLeaderboard] = useState([]);
  const [type, setType] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  };

  const getRange = () => {
    const date = new Date(currentDate);

    if (type === "week") {
      const day = date.getDay();
      const diffToMonday = day === 0 ? -6 : 1 - day;
      const start = new Date(date);
      start.setDate(date.getDate() + diffToMonday);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return { from: start, to: end };
    }

    if (type === "month") {
      return {
        from: new Date(date.getFullYear(), date.getMonth(), 1),
        to: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      };
    }

    if (type === "year") {
      return {
        from: new Date(date.getFullYear(), 0, 1),
        to: new Date(date.getFullYear(), 11, 31),
      };
    }
  };

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const { from, to } = getRange();

      const res = await axios.get(
        `http://localhost:3000/api/points/leaderboard?from=${formatDate(
          from
        )}&to=${formatDate(to)}`,
        { withCredentials: true }
      );

      setLeaderboard(res.data.leaderboard);
    } catch (err) {
      console.error("Leaderboard error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [type, currentDate]);

  const handlePrevious = () => {
    const date = new Date(currentDate);
    if (type === "week") date.setDate(date.getDate() - 7);
    if (type === "month") date.setMonth(date.getMonth() - 1);
    if (type === "year") date.setFullYear(date.getFullYear() - 1);
    setCurrentDate(date);
  };

  const handleNext = () => {
    const date = new Date(currentDate);
    if (type === "week") date.setDate(date.getDate() + 7);
    if (type === "month") date.setMonth(date.getMonth() + 1);
    if (type === "year") date.setFullYear(date.getFullYear() + 1);
    if (date > new Date()) return;
    setCurrentDate(date);
  };

  const isNextDisabled = () => {
    const date = new Date(currentDate);
    if (type === "week") date.setDate(date.getDate() + 7);
    if (type === "month") date.setMonth(date.getMonth() + 1);
    if (type === "year") date.setFullYear(date.getFullYear() + 1);
    return date > new Date();
  };

  const { from, to } = getRange();
  const topThree = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white relative overflow-hidden">

      {/* Neon Glow Background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">

          <div className="col-span-12 lg:col-span-3">
            <Sidebar profile={user} />
          </div>

          <div className="col-span-12 lg:col-span-9 space-y-8">
            <TopBar />

            {/* Controls */}
            <div className="flex justify-between items-center flex-wrap gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-xl">

              <div className="flex gap-3 items-center">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-xl px-4 py-2"
                >
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>

                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
                >
                  ← Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className={`px-4 py-2 rounded-xl transition ${
                    isNextDisabled()
                      ? "bg-white/5 text-white/30 cursor-not-allowed"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  Next →
                </button>
              </div>

              <div className="text-sm text-white/50">
                {formatDate(from)} → {formatDate(to)}
              </div>
            </div>

            {/* Podium */}
            {!loading && topThree.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6 text-center">

                {topThree.map((item, index) => {
                  const isFirst = index === 0;
                  const medalColors = [
                    "from-yellow-400 to-yellow-600",
                    "from-gray-300 to-gray-500",
                    "from-orange-400 to-orange-600",
                  ];

                  return (
                    <div
                      key={item.user._id}
                      onClick={() => navigate(`/profile/${item.user._id}`)}
                      className={`cursor-pointer rounded-3xl p-6 backdrop-blur-xl border border-white/10 transition transform hover:scale-105
                        ${isFirst ? "bg-gradient-to-br from-yellow-500/20 to-yellow-700/10 shadow-2xl" : "bg-white/5"}`}
                    >
                      <div className="text-5xl mb-2">
                        {index === 0 && "👑"}
                        {index === 1 && "🥈"}
                        {index === 2 && "🥉"}
                      </div>

                      <div className={`h-20 w-20 mx-auto rounded-full bg-gradient-to-br ${medalColors[index]} flex items-center justify-center text-2xl font-bold shadow-xl`}>
                        {item.user.name?.[0]}
                      </div>

                      <div className="mt-4 font-semibold text-lg">
                        {item.user.name}
                      </div>

                      <div className="text-cyan-400 text-2xl font-bold mt-2">
                        {item.totalPoints}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Rest of leaderboard */}
            <div className="space-y-4 mt-6">
              {others.map((item, index) => (
                <div
                  key={item.user._id}
                  onClick={() => navigate(`/profile/${item.user._id}`)}
                  className="flex justify-between items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-white/50 font-bold w-6">
                      #{index + 4}
                    </div>

                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold">
                      {item.user.name?.[0]}
                    </div>

                    <div>
                      <div className="font-medium">
                        {item.user.name}
                      </div>
                      <div className="text-xs text-white/40">
                        {item.user.email}
                      </div>
                    </div>
                  </div>

                  <div className="text-cyan-400 font-bold">
                    ⭐ {item.totalPoints}
                  </div>
                </div>
              ))}
            </div>

            {loading && (
              <div className="text-center text-white/40 mt-10">
                Loading leaderboard...
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
