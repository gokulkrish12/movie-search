import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <nav className="sticky top-0 z-30 backdrop-blur bg-slate-950/70 border-b border-white/5">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-slate-900"
          >
            <path d="M4 4h3l1.5 3H5L4 4zm5 0h3l1.5 3H10L9 4zm5 0h3l1.5 3H15L14 4zm5 0h1.5L21 7h-1.5L19 4zM3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
          </svg>
        </span>
        <span className="text-white font-bold text-lg tracking-tight group-hover:text-amber-300 transition-colors">
          CineSearch
        </span>
      </Link>
      <span className="hidden sm:inline text-xs text-slate-400">
        Discover movies, series & episodes
      </span>
    </div>
  </nav>
);
