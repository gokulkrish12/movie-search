const API_KEY = "c0c9c50e";
const BASE = "https://www.omdbapi.com/";
export const searchMovies = (q, p, t) =>
  fetch(`${BASE}?apikey=${API_KEY}&s=${q}&page=${p}&type=${t}`).then((r) =>
    r.json()
  );
export const getMovieDetails = (id) =>
  fetch(`${BASE}?apikey=${API_KEY}&i=${id}&plot=full`).then((r) => r.json());
