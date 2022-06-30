import logo from "./logo.svg";
import "./App.css";
import Search from "./components/Search.js";
import Update from "./components/Update.js";
import Show from "./components/Show.js";
import Movie from "./components/Movie.js";
import State from "./components/State.js";
import Test from "./components/Test.js";
import Add from "./components/Add.js";
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Search />; */}
      {/* <State />; */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Movie />} />
          <Route path="/movies/:id" element={<Update />} />
          <Route path="/add/" element={<Add />} />
          <Route path="/show/movies/:id" element={<Show />} />
          <Route path="/effect" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
