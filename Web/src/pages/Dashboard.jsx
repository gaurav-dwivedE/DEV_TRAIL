import { use, useContext, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import LogCards from "../components/LogCards";
import { AuthContext } from "../context/AuthProvider";
import CreateLog from "../components/CreateLog";

export default function Dashboard() {
  const { user, loading } = useContext(AuthContext)
  const logScrollRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">

          <div className="col-span-12 lg:col-span-3">
            <Sidebar profile = {user}/>
          </div>

          <div className="col-span-12 lg:col-span-9 space-y-6">
            <TopBar setIsOpen = {setIsOpen}/>


            <div
              ref={logScrollRef}
              className="h-[calc(100vh-180px)] overflow-x-hidden relative overflow-y-auto px-3"
            >
              <CreateLog isOpen = {isOpen} setIsOpen = {setIsOpen }/>
              <LogCards scrollContainerRef={logScrollRef} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
