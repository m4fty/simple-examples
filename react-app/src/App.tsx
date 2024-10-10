import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomStringify from "./components/CustomStringify";
import CustomAssign from './components/CustomAssign';
import DeepEqual from './components/DeepEqual';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/stringify">Custom Stringify</Link>
          </li>
          <li>
            <Link to="/assign">Custom Assign</Link>
          </li>
          <li>
            <Link to="/deep-equal">Deep Equal</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/stringify" element={<CustomStringify />} />
        <Route path="/assign" element={<CustomAssign />} />
        <Route path="/deep-equal" element={<DeepEqual />} />
        <Route path="/" element={<h2>Bienvenido a los Ejercicios</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
