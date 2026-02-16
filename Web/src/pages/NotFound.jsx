"use client";

import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white flex items-center justify-center px-6">
      
      <div className="max-w-xl w-full text-center">

        {/* 404 Number */}
        <h1 className="text-8xl font-bold tracking-tight text-white/90">
          404
        </h1>

        {/* Divider */}
        <div className="w-20 h-0.5 bg-white/20 mx-auto my-6" />

        {/* Message */}
        <h2 className="text-2xl font-semibold text-white">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-400">
          The page you're looking for doesn't exist or may have been removed.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#141a22] hover:bg-[#1b222c] transition border border-white/10"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition font-medium"
          >
            <Home size={18} />
            Dashboard
          </Link>
        </div>

        {/* Footer Text */}
        <p className="mt-10 text-xs text-white/30">
          Error Code: 404
        </p>
      </div>
    </div>
  );
}
