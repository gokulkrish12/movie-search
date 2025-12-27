import React from "react";
import { Link } from "react-router-dom";
export default ({ movie }) => (
  <Link to={`/movie/${movie.imdbID}`} className="border rounded p-3">
    <img src={movie.Poster} className="h-60 w-full object-cover mb-2" />
    <h3 className="font-semibold">{movie.Title}</h3>
    <p className="text-sm">{movie.Year}</p>
  </Link>
);
