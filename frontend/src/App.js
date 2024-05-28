import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddPodcast from './Add-Podcast/Add-Podcast';
import Home from './Home/Home';
import AddRecord from './Add-Record/Add-Record';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHouse, faFileMedical } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <h1>PodMetrics</h1>
        
        <div className="Links">
          <Link to="/" className='linkItem'>
            <FontAwesomeIcon className='icons' icon={faHouse} fixedWidth/>
          </Link>

          <Link to="/add" className='linkItem'>
            <FontAwesomeIcon className='icons' icon={faPlus} fixedWidth/>
          </Link>

          <Link to="/add-record" className='linkItem'>
            <FontAwesomeIcon className='icons' icon={faFileMedical} fixedWidth/>
          </Link>
        </div>
        
        
      </header>
      <div className="Content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPodcast />} />
          <Route path="/add-record" element={<AddRecord />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
};

const albumCover = {
  width: 200,
  height: 200,
}

export default App;
