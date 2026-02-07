export default function WeeklyCommits() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="text-lg font-semibold mb-4">Weekly Code Commits</div>

      <div className="h-28 bg-white/5 rounded-xl flex items-end p-4">
        <div className="w-full h-full bg-gradient-to-r from-cyan-400/40 via-green-400/30 to-cyan-400/40 rounded-lg" />
      </div>

      <div className="mt-4 text-sm text-white/60">
        Your Public Profile Link
      </div>
      <div className="mt-2 flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2">
        <span className="text-xs text-white/60">devtrail.com/k/sheryiansai</span>
        <button className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20">
          Copy
        </button>
      </div>
    </div>
  );
}
