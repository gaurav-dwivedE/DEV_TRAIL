export default function Contributors() {
  const list = [
    { name: "Sheryians AI", wins: "45 Wins" },
    { name: "Maya S.", wins: "30 Wins" },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="text-lg font-semibold mb-4">Top Contributors</div>
      <div className="space-y-4">
        {list.map((c, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white/5 rounded-xl p-3 border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/10" />
              <div>
                <div className="text-sm font-semibold">{c.name}</div>
                <div className="text-xs text-white/50">Alex L</div>
              </div>
            </div>
            <div className="text-cyan-300 text-sm">{c.wins}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
