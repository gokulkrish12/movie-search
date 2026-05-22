import React from "react";

export default ({ value, onChange, onSearch }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSearch();
    }}
    className="flex flex-col sm:flex-row gap-3 w-full"
  >
    <div className="relative flex-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400/40 transition"
        placeholder="Search for movies, series, episodes..."
      />
    </div>
    <button
      type="submit"
      className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:brightness-110 active:scale-[0.98] transition"
    >
      Search
    </button>
  </form>
);
