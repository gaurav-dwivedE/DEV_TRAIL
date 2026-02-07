export default function LogCards() {
  const logs = [
    {
      name: "Milestone Achieved",
      text: "Deployed Full Stack App!",
      tags: "#Cloud #MERN",
    },
    {
      name: "Deployed First Stack App to AWS",
      text: "Testing the new mainboard feature!",
      tags: "#Cloud #MERN",
    },
  ];

  return (
    <div>
      <div className="text-xs text-white/50 mb-3">Wednesday, Jan 26, 2026 • 10:00 AM IST</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logs.map((log, i) => (
          <div
            key={i}
            className="bg-white/80 text-black rounded-2xl p-5 shadow-md"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="text-sm font-semibold">{log.name}</div>
            </div>
            <div className="text-sm">{log.text}</div>
            <div className="text-xs text-blue-500 mt-3">{log.tags}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
