import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Baidu from "./components/Baidu";
import HomePage from "./components/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/baidu" element={<Baidu/>} />
      </Routes>
    </Router>
  );
};

export default App;
