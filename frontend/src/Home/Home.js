import React, { useState, useEffect } from 'react';
import './Home.css';
import { useDispatch } from 'react-redux';
import { setPodcasts } from '../actions';
import { CircularProgress, Box, Modal, Typography } from '@mui/material';
import { Duration } from 'luxon';

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState({});
  const [records, setRecords] = useState([]);
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
  }, [dispatch]);

  useEffect(() => {
    if (selectedPodcast && Object.keys(selectedPodcast).length > 0) {
      console.log(selectedPodcast);
      fetch(`http://localhost:5000/api/v1/records?podcastId=${selectedPodcast._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.records);
        setRecords(data.records);
      })
      .catch((err) => {
        console.error('Error fetching records: ', err);
      });
    }
  }, [selectedPodcast]);

  const handleOpen = (item) => { 
    setOpen(true);
    setSelectedPodcast(item);
   };

  const handleClose = () => { setOpen(false); };

  const calculateTotalDuration = () => {
    let totalDuration = Duration.fromObject({ hours: 0, minutes: 0, seconds: 0});
    records.forEach((record) => {
      if (record.duration.split(':').length === 2) {
        record.duration = `00:${record.duration}`;
      }
      const [hours, minutes, seconds] = record.duration.split(':').map(Number);
      const recordDuration = Duration.fromObject({ hours: hours, minutes: minutes, seconds: seconds });
      console.log(recordDuration);
      totalDuration = totalDuration.plus(recordDuration);
    });
    return totalDuration.toFormat('hh:mm:ss');
  };

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
            <Typography id="modal-modal-title" variant="h4" component="h2">
              {selectedPodcast.title}
            </Typography>
            <br />
            <div className='statGrid grid grid-cols-2 gap-5'>
              <div className='timeBox statBox'>
                <h3>Total Time Spent</h3>
                <div className='statContent'>
             
                  {calculateTotalDuration()}
                </div>
              </div>
              <div className='ratingBox statBox'>
                <h3>Average Rating</h3>
                <div className='statContent'>
                  {records.length > 0 ? records.reduce((acc, record) => acc + record.rating, 0) / records.length : 0}
                </div>
              </div>
              <div className='countBox statBox'>
                <h3>Total Episodes</h3>
                <div className='statContent'>
                  {records.length}
                </div>
              </div>
              <div className='dateBox statBox'>
                <h3>Last Listened</h3>
                <div className='statContent'>
                  {records.length > 0 ? new Date(records[records.length - 1].date).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>      
          </Box>
        </Modal>
        <div className='grid sm:grid-cols-2 md:grid-cols-5 gap-3'>
            {data.map((item, index) => (
                <div key={index} onClick={() => {handleOpen(item)}}>
                    <img className='podcastCover' src={item.image} alt={item.title} />
                </div>
            ))}
        </div>
    </div>
  );
}


export default Home;