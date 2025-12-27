import React from "react";
import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import Navbar from "./components/Navbar";
export default () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  </>
);
