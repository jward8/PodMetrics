import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddPodcast from './Add-Podcast';
import Home from './Home';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/podcasts')
    .then((res) => res.json())
    .then((data) => {
      console.log(data.list);
      setData(data.list)
    })
    .catch((err) => console.error('Error fetching data: ', err));
  }, []);

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
        
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddPodcast />} />
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
