import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function LogCards({ scrollContainerRef }) {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const limit = 4;

  const fetchLogs = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/api/logs?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );

      setLogs((prev) => [...prev, ...res.data.logs]);
      setHasMore(res.data.hasMore);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  // First load
  useEffect(() => {
    fetchLogs();
  }, []);

  // 👇 SCROLL LISTENER (THIS FIXES EVERYTHING)
  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      const nearBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 120;

      if (nearBottom) {
        fetchLogs();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef, page, hasMore, loading]);

  return (
    <div className="space-y-5 ">
      {logs.map((log) => (
        <div
        onClick={() => navigate(`/logs/${log._id}`)}
          key={log._id}
          className="rounded-3xl bg-white/10 backdrop-blur-xl
          border border-white/10 p-5 shadow-lg
          transition hover:scale-[1.02]"
        >
          {/* User */}
          <div onClick={() => navigate(`/profile/${log.user._id}`)} className="flex items-center gap-3 mb-3 cursor-pointer">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold">
              {log.user?.name?.[0]}
            </div>

            <div>
              <div className="text-sm font-semibold">
                {log.user?.name}
              </div>
              <div className="text-xs text-white/50">
                {new Date(log.createdAt).toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-base font-semibold mb-1">
            {log.title}
          </div>
          <div className="text-sm text-white/70">
            {log.description}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                log.isPrivate
                  ? "bg-red-500/10 text-red-400"
                  : "bg-green-500/10 text-green-400"
              }`}
            >
              {log.isPrivate ? "Private" : "Public"}
            </span>

            <span className="text-xs text-white/40">
              {log.user?.totalPoints ?? 0} pts
            </span>
          </div>
        </div>
      ))}

      {loading && (
        <div className="text-center text-white/40 text-sm py-4">
          Loading more...
        </div>
      )}

      {!hasMore && (
        <div className="text-center text-white/30 text-sm py-4">
          You’re all caught up 🚀
        </div>
      )}
    </div>
  );
}
