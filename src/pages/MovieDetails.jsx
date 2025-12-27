import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/omdbService";
export default () => {
  const { id } = useParams();
  const [m, setM] = useState(null);
  useEffect(() => {
    getMovieDetails(id).then(setM);
  }, [id]);
  if (!m) return <p className="p-6">Loading...</p>;
  return (
    <div className="p-6 flex gap-6">
      <img src={m.Poster} className="w-64" />
      <div>
        <h2 className="text-2xl font-bold">{m.Title}</h2>
        <p>
          {m.Year} • {m.Genre}
        </p>
        <p className="mt-2">{m.Plot}</p>
        <p className="mt-2">Actors: {m.Actors}</p>
        <p className="mt-2">IMDB Rating: {m.imdbRating}</p>
      </div>
    </div>
  );
};
