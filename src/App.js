import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import PokedexPage from './pages/Pokedex';
import About from './pages/About';
import NavBar from './components/navbar/Navbar';

function App() {
  return (
    <Router basename='/pokedex'>
      <NavBar/>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<PokedexPage />} />
      </Routes>

    </Router>
  );
}

export default App;
