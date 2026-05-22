import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/omdbService";

const PAGE_SIZE = 10;
const TYPES = [
  { value: "", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "series", label: "Series" },
  { value: "episode", label: "Episodes" },
];

export default () => {
  const [q, setQ] = useState("");
  const [submittedQ, setSubmittedQ] = useState("");
  const [m, setM] = useState([]);
  const [p, setP] = useState(1);
  const [t, setT] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));

  useEffect(() => {
    if (!submittedQ) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    searchMovies(submittedQ, p, t)
      .then((d) => {
        if (cancelled) return;
        setM(d.Search || []);
        setTotalResults(parseInt(d.totalResults, 10) || 0);
      })
      .catch((err) => {
        if (cancelled) return;
        setM([]);
        setTotalResults(0);
        setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [submittedQ, p, t]);

  const search = () => {
    if (!q.trim()) {
      setError("Please enter a search term.");
      setM([]);
      setTotalResults(0);
      setSubmittedQ("");
      return;
    }
    setP(1);
    setSubmittedQ(q.trim());
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Hero */}
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 bg-clip-text text-transparent">
          Find your next favorite
        </h1>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto">
          Search a vast library of movies, series, and episodes powered by OMDb.
        </p>
      </header>

      {/* Search + filter */}
      <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 sm:p-5 backdrop-blur-sm shadow-xl shadow-black/20">
        <SearchBar value={q} onChange={setQ} onSearch={search} />
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-xs uppercase tracking-wider text-slate-400 mr-1">
            Filter:
          </span>
          {TYPES.map((opt) => {
            const active = t === opt.value;
            return (
              <button
                key={opt.value || "all"}
                onClick={() => {
                  setT(opt.value);
                  setP(1);
                }}
                className={`px-3 py-1.5 text-sm rounded-full border transition ${
                  active
                    ? "bg-amber-400 text-slate-900 border-amber-400 font-semibold"
                    : "bg-slate-900/60 text-slate-300 border-white/10 hover:border-amber-400/40 hover:text-amber-200"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-slate-900/60 border border-white/5 animate-pulse"
            >
              <div className="aspect-[2/3] bg-slate-800/70" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-slate-800 rounded w-3/4" />
                <div className="h-3 bg-slate-800 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="mt-8 flex items-start gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mt-0.5 flex-shrink-0"
          >
            <path d="M12 2 1 21h22L12 2zm0 6 7.5 13h-15L12 8zm-1 4v4h2v-4h-2zm0 5v2h2v-2h-2z" />
          </svg>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && submittedQ && m.length === 0 && (
        <p className="mt-10 text-center text-slate-400">
          No results found for "{submittedQ}".
        </p>
      )}

      {!loading && !error && !submittedQ && (
        <p className="mt-10 text-center text-slate-500">
          Try searching for "Inception", "Breaking Bad", or "Dune".
        </p>
      )}

      {/* Results grid */}
      {!loading && !error && m.length > 0 && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
          {m.map((x) => (
            <MovieCard key={x.imdbID} movie={x} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalResults > 0 && !error && (
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setP((cur) => Math.max(1, cur - 1))}
            disabled={p <= 1 || loading}
            className="px-4 py-2 rounded-lg bg-slate-900/70 border border-white/10 text-slate-200 hover:border-amber-400/50 hover:text-amber-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-slate-200 transition"
          >
            ← Prev
          </button>
          <span className="text-sm text-slate-400">
            Page <span className="text-white font-semibold">{p}</span> of{" "}
            <span className="text-white font-semibold">{totalPages}</span>{" "}
            <span className="text-slate-500">· {totalResults} results</span>
          </span>
          <button
            onClick={() => setP((cur) => Math.min(totalPages, cur + 1))}
            disabled={p >= totalPages || loading}
            className="px-4 py-2 rounded-lg bg-slate-900/70 border border-white/10 text-slate-200 hover:border-amber-400/50 hover:text-amber-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-slate-200 transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};
