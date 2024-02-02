import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages//Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/page";
import Signup from "./pages/Signup/page";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
    </Routes>
  );
};
export default App;
