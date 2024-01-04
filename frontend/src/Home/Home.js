import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './Home.css';
import { useDispatch } from 'react-redux';
import { setPodcasts } from '../actions';

const Home = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/podcasts')
    .then((res) => res.json())
    .then((data) => {
        console.log('a' + data.data);
      setData(data.data);
      dispatch(setPodcasts(data.data));
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