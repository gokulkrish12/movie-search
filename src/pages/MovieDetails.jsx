import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/omdbService";

const FALLBACK =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-size='18' dy='.3em'%3ENo Poster%3C/text%3E%3C/svg%3E";

const Stat = ({ label, value }) =>
  value && value !== "N/A" ? (
    <div className="rounded-lg bg-slate-900/60 border border-white/5 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-slate-400">
        {label}
      </div>
      <div className="text-sm text-white font-medium mt-0.5">{value}</div>
    </div>
  ) : null;

export default () => {
  const { id } = useParams();
  const [m, setM] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setM(null);
    getMovieDetails(id)
      .then((data) => {
        if (!cancelled) setM(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10 animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-72 aspect-[2/3] bg-slate-800/70 rounded-xl" />
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-slate-800 rounded w-2/3" />
            <div className="h-4 bg-slate-800 rounded w-1/3" />
            <div className="h-24 bg-slate-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-amber-300 mb-4"
        >
          ← Back to search
        </Link>
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200">
          {error}
        </div>
      </div>
    );
  }

  if (!m) return null;

  const poster = m.Poster && m.Poster !== "N/A" ? m.Poster : FALLBACK;
  const genres = m.Genre && m.Genre !== "N/A" ? m.Genre.split(",").map((g) => g.trim()) : [];

  return (
    <div className="relative">
      {/* Backdrop */}
      <div
        className="absolute inset-x-0 top-0 h-96 bg-cover bg-center opacity-20 blur-2xl"
        style={{ backgroundImage: `url(${poster})` }}
      />
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-transparent to-[#0b1020]" />

      <div className="relative max-w-5xl mx-auto px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-amber-300 mb-6 transition-colors"
        >
          ← Back to search
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={poster}
            alt={m.Title}
            className="w-full md:w-72 rounded-xl shadow-2xl shadow-black/50 border border-white/10"
          />
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {m.Title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-3 text-sm text-slate-300">
              {m.Year && m.Year !== "N/A" && <span>{m.Year}</span>}
              {m.Rated && m.Rated !== "N/A" && (
                <>
                  <span className="text-slate-600">•</span>
                  <span className="px-2 py-0.5 rounded border border-white/15 text-xs">
                    {m.Rated}
                  </span>
                </>
              )}
              {m.Runtime && m.Runtime !== "N/A" && (
                <>
                  <span className="text-slate-600">•</span>
                  <span>{m.Runtime}</span>
                </>
              )}
            </div>

            {genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {genres.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 text-xs rounded-full bg-amber-400/10 text-amber-200 border border-amber-400/30"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}

            {m.imdbRating && m.imdbRating !== "N/A" && (
              <div className="inline-flex items-center gap-2 mt-5 px-3 py-2 rounded-lg bg-slate-900/70 border border-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-amber-400"
                >
                  <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                </svg>
                <span className="text-white font-bold">{m.imdbRating}</span>
                <span className="text-slate-400 text-sm">/ 10</span>
                {m.imdbVotes && m.imdbVotes !== "N/A" && (
                  <span className="text-slate-500 text-xs ml-1">
                    ({m.imdbVotes} votes)
                  </span>
                )}
              </div>
            )}

            {m.Plot && m.Plot !== "N/A" && (
              <p className="mt-6 text-slate-200 leading-relaxed">{m.Plot}</p>
            )}

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
              <Stat label="Director" value={m.Director} />
              <Stat label="Writer" value={m.Writer} />
              <Stat label="Released" value={m.Released} />
              <Stat label="Language" value={m.Language} />
              <Stat label="Country" value={m.Country} />
              <Stat label="Box Office" value={m.BoxOffice} />
            </div>

            {m.Actors && m.Actors !== "N/A" && (
              <div className="mt-6">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                  Cast
                </div>
                <p className="text-slate-200">{m.Actors}</p>
              </div>
            )}

            {m.Awards && m.Awards !== "N/A" && (
              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                  Awards
                </div>
                <p className="text-slate-300 italic">{m.Awards}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
