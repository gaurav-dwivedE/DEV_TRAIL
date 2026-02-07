import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import DailyFocus from "./components/DailyFocus";
import LogCards from "./components/LogCards";
import Contributors from "./components/Contributors";
import WeeklyCommits from "./components/WeeklyCommits";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      <div className="relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,255,255,0.08),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(0,153,255,0.08),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              <Sidebar />
            </div>

            <div className="col-span-12 lg:col-span-9 space-y-6">
              <TopBar />

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-8 space-y-6">
                  <DailyFocus />
                  <LogCards />
                </div>

                <div className="col-span-12 xl:col-span-4 space-y-6">
                  <Contributors />
                  <WeeklyCommits />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Glow border */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 shadow-[0_0_80px_rgba(0,255,255,0.15)]" />
      </div>
    </div>
  );
}
