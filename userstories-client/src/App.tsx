import React from "react";
import MoviesList from "./components/MoviesList/MoviesList";
import SingleMovie from "./components/MoviesList/SingleMovie";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path=":key/:id" element={<SingleMovie />} />
      </Routes>
      <Routes>
        <Route path="/" element={<MoviesList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
