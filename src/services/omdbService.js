const API_KEY = "c0c9c50e";
const BASE = "https://www.omdbapi.com/";

const request = async (url) => {
  let res;
  try {
    res = await fetch(url);
  } catch {
    throw new Error("Network error. Please check your connection and try again.");
  }
  if (!res.ok) {
    throw new Error(`Request failed (${res.status} ${res.statusText})`);
  }
  const data = await res.json();
  if (data.Response === "False") {
    throw new Error(data.Error || "Unknown error from OMDb API");
  }
  return data;
};

export const searchMovies = (q, p = 1, t = "") => {
  const params = new URLSearchParams({ apikey: API_KEY, s: q, page: p });
  if (t) params.append("type", t);
  return request(`${BASE}?${params.toString()}`);
};

export const getMovieDetails = (id) =>
  request(`${BASE}?apikey=${API_KEY}&i=${id}&plot=full`);
