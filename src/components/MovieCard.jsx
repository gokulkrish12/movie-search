import React from "react";
import { Link } from "react-router-dom";

const FALLBACK =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-size='18' dy='.3em'%3ENo Poster%3C/text%3E%3C/svg%3E";

export default ({ movie }) => {
  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK;
  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="group relative rounded-xl overflow-hidden bg-slate-900/60 border border-white/5 hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-200"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={poster}
          alt={movie.Title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
        {movie.Type && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-amber-400/90 text-slate-900 font-semibold">
            {movie.Type}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 group-hover:text-amber-300 transition-colors">
          {movie.Title}
        </h3>
        <p className="text-xs text-slate-400 mt-1">{movie.Year}</p>
      </div>
    </Link>
  );
};
