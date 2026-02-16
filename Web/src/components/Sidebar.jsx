import { FiHome } from "react-icons/fi";
import { BsFillPostcardFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

export default function Sidebar({profile}) {
  const navigate = useNavigate()
  const nav = [
    { label: "Home", icon: <FiHome />, active: false, path :'/'},
    { label: "Wins", icon: <BsFillPostcardFill />, active: false , path :'/wins'},
    { label: "Profile", icon: <FaRegUser />, active: false, path :`/profile/${profile?._id}`},
  ];

  return (
    <aside className="bg-white/5 border border-white/10 rounded-3xl  p-6 backdrop-blur-xl shadow-lg">
      <div className="flex items-center gap-3 mb-10">
        <div className="h-10 w-10 rounded-xl bg-cyan-400/20 flex items-center justify-center">
          <span className="text-cyan-300 font-bold">D</span>
        </div>
        <div className="text-xl font-semibold tracking-wide">DevTrail</div>
      </div>

      <nav className="space-y-3">
        {nav.map((item) => (
          <button
          onClick={() => navigate(item.path)}
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border ${
              item.active
                ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                : "border-transparent text-white/70 hover:bg-white/5"
            }`}
          >
            <div className="h-8 w-8 rounded-md bg-white/10 flex justify-center items-center" >
           {item.icon}
            </div>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div onClick={() => navigate(`/profile/${profile?._id}`)} className="mt-12 flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
        <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
          {profile?.name[0]}
        </div>
        <div>
          <div className="text-sm font-semibold">{profile?.name}</div>
          <div className="text-xs text-green-400 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400 inline-block" />
            Online
          </div>
        </div>
      </div>
    </aside>
  );
}
