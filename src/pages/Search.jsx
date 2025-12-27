import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/omdbService";
export default () => {
  const [q, setQ] = useState("");
  const [m, setM] = useState([]);
  const [p, setP] = useState(1);
  const [t, setT] = useState("");
  const search = () => searchMovies(q, p, t).then((d) => setM(d.Search || []));
  return (
    <div className="p-6">
      <SearchBar value={q} onChange={setQ} onSearch={search} />
      <select
        className="border p-2 mb-4"
        onChange={(e) => setT(e.target.value)}
      >
        <option value="">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {m.map((x) => (
          <MovieCard key={x.imdbID} movie={x} />
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        <button onClick={() => setP(Math.max(1, p - 1))}>Prev</button>
        <button onClick={() => setP(p + 1)}>Next</button>
      </div>
    </div>
  );
};
