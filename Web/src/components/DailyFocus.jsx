export default function DailyFocus() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">Daily Focus</div>
          <div className="text-white/60 text-sm">Complete LangChain tutorial - 45 min</div>
        </div>
        <div className="h-10 w-10 rounded-full bg-white/10" />
      </div>

      <div className="mt-6">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-cyan-400 rounded-full" />
        </div>
      </div>
    </div>
  );
}
