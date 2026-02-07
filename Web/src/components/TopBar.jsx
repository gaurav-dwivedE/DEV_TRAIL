export default function TopBar() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <div className="text-3xl font-semibold">Build Your Dev Legacy.</div>
        <div className="text-white/60 text-sm mt-1">
          Log progress, celebrate, and track your coding journey.
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:block text-xs text-white/50">
          Wednesday, January 28, 2026 • 10:54 AM IST
        </div>
        <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
          New Log Entry <span className="ml-2 text-cyan-400">+</span>
        </button>
      </div>
    </div>
  );
}
