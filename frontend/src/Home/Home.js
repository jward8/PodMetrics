import React, { useState, useEffect } from 'react';
import './Home.css';
import { useDispatch } from 'react-redux';
import { setPodcasts } from '../actions';
import { CircularProgress, Box, Modal, Typography } from '@mui/material';

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState({});
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

  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  return (
    <div className="Home">
        {isLoading ?  <CircularProgress id='spinner' /> : null}
        <Modal
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          open={open} 
          onClose={handleClose}
        >
          <Box className="modalContent">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedPodcast.title}
            </Typography>
          </Box>
        </Modal>
        <div className='grid sm:grid-cols-2 md:grid-cols-5 gap-3'>
            {data.map((item, index) => (
                <div key={index} onClick={() => {handleOpen(); setSelectedPodcast(item)}}>
                    <img className='podcastCover' src={item.image} alt={item.title} />
                </div>
            ))}
        </div>
    </div>
  );
}


export default Home;