import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './Home.css';

const Home = () => {
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
    <div className="Home">
        <div className='grid grid-cols-5 gap-3'>
            {data.map((item, index) => (
                <div key={index}>
                    <img style={albumCover} src={item.image} alt={item.title} />
                </div>
            ))}
        </div>
    </div>
  );
}

const albumCover = {
    width: 200,
    height: 200,
  }

export default Home;