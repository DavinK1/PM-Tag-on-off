import React from "react";
import FooterHomepage from "./components/footer/footer";
import Homepage from "./pages/Homepage/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import G6Block from "./pages/G6-Block/G6Block";
import G6Main from "./pages/G6-Main/G6Main";
import G6Head from "./pages/G6-Head/G6Head";
import G6Crank from "./pages/G6-Crank/G6Crank";
import G6Camshaft from "./pages/G6-Camshaft/G6Camshaft";
import AddData from "./pages/AddData/AddData";
import EditData from "./pages/EditData/EditData";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/g6block" element={<G6Block />} />
      <Route path="/g6main" element={<G6Main />} />
      <Route path="/g6head" element={<G6Head />} />
      <Route path="/g6crank" element={<G6Crank />} />
      <Route path="/g6camshaft" element={<G6Camshaft />} />
      <Route path="/adddata" element={<AddData />} />
      <Route path="/editdata" element={<EditData />} />
    </Routes>
  );
}

export default App;
