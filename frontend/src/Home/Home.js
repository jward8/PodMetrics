import React, { useState, useEffect } from 'react';
import './Home.css';
import { useDispatch } from 'react-redux';
import { setPodcasts } from '../actions';
import { CircularProgress } from '@mui/material';

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    fetch('http://localhost:5000/api/v1/podcasts')
    .then((res) => res.json())
    .then((data) => {
      setData(data.data);
      dispatch(setPodcasts(data.data));
      setIsLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching data: ', err);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="Home">
        {isLoading ?  <CircularProgress id='spinner' /> : null}
        <div className='grid sm:grid-cols-2 md:grid-cols-5 gap-3'>
            {data.map((item, index) => (
                <div key={index} >
                    <img className='podcastCover' src={item.image} alt={item.title} />
                </div>
            ))}
        </div>
    </div>
  );
}


export default Home;