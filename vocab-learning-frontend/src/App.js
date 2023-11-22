import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Folder from "./components/Folder";
import Footer from "./components/Footer";
import Learning from "./components/Learning";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/folder/:id" element={<Folder />} />
          <Route path="/folder/:id/learning" element={<Learning />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
