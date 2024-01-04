import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddPodcast from './Add-Podcast/Add-Podcast';
import Home from './Home/Home';
import AddRecord from './Add-Record/Add-Record';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <h1>PodMetrics</h1>
        {/* Add Podcasts */}
        <Link to="/add">
          <button>Add Podcast</button>
        </Link>

        <hr />

        <Link to="/">
          <button>Home</button>
        </Link>

        <hr />
        <Link to="/add-record">
          <button>Add Record</button>
        </Link>
        
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddPodcast />} />
        <Route path="/add-record" element={<AddRecord />} />
      </Routes>
    </div>
    </Router>
  );
};

const albumCover = {
  width: 200,
  height: 200,
}

export default App;
