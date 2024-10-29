import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './styles.css';
import { useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Rating } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';

const AddRecord = () => {
    const podcasts = useSelector((state) => state.podcasts);
    const [selectedPodcast, setSelectedPodcast] = useState('');
    const [episode, setEpisode] = useState(null);
    const [rating, setRating] = useState('');
    const [platform, setPlatform] = useState('');
    const [episodeList, setEpisodesList] = useState(['']);
    const [date, setDate] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        let podcastId = podcasts.filter((podcast) => podcast.title === selectedPodcast)[0]._id;

        const newRecord = {
            podcast: podcastId,
            episode: episode,
            rating: rating,
            dateListened: date,
            platform: platform
        };

        console.log(newRecord);

        fetch('http://localhost:5000/api/v1/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecord)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSelectedPodcast('');
                setEpisode('');
                setRating('');
                setPlatform('');
                setDate(null);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        // Handle form submission logic here
    };


    const getPodcastTitle = () => {
        return podcasts.map((podcast) => podcast.title);
    }

    return (
        <div className='AddRecord'>
            <h3>Add Record</h3>
            <form className='AddForm' onSubmit={handleSubmit}>
                <div className='FormInput'>
                    <Autocomplete
                        id="combo-box-demo"
                        options={getPodcastTitle().sort()}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        groupBy={(option) => option[0].toUpperCase()}
                        renderInput={(params) => <TextField {...params} label="Podcast Name" variant="outlined"
                        sx={{ input: { color: 'white'} }} />}
                        onChange={(e) => {
                            if (e.target.textContent) {
                                setSelectedPodcast(e.target.textContent);
                            } else {
                                setSelectedPodcast('');
                                setEpisodesList([]);
                                setEpisode('');
                            }
                        }}
                        onBlur={() => {
                            if (selectedPodcast) {
                                let id = podcasts.filter((podcast) => podcast.title === selectedPodcast)[0]._id;
                                fetch(`http://localhost:5000/api/v1/podcasts/episodes?podcastId=${id}`)
                                    .then(response => response.json())
                                    .then(data => {
                                        setEpisodesList(data.episodes);
                                    })
                                    .catch(error => {
                                        console.error('Error:', error);
                                    });
                            }
                        }}
                        value={selectedPodcast}
                    />

                </div>

                <Autocomplete
                    id='combo-box-demo'
                    options={episodeList} 
                    renderOption={(props, option) => {
                        return (
                        <li {...props} key={option.id}> 
                            {option.title}
                        </li>
                        );
                    }}
                    getOptionLabel={(option) => option.title ? option.title : option}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label='Episode Name' variant='outlined' />}
                    variant='outlined'
                    onChange={(event, newValue) => { 
                        if (newValue) {
                            console.log(newValue);
                        setEpisode(newValue);
                        } 
                    }}
                    value={episode}
                    isOptionEqualToValue={(option, value) => option.title === value.title}
                />

                <div className='FormInput'>
                    <DatePicker 
                    className='datePicker' 
                    label='Date Listened' 
                    variant='outlined'
                    sx={{ input: { color: 'white'} }}
                    onChange={(e) => {
                        console.log(DateTime.fromISO(e).toFormat('yyyy-MM-dd'));
                        setDate(DateTime.fromISO(e).toFormat('yyyy-MM-dd'));
                    }}
                    value={date}
                    />
                </div>

                <div className='FormInput'>
                    <TextField id='outlined-basic'
                        fullWidth label='Platform' variant='outlined' value={platform}
                        sx={{ input: { color: 'white'} }} onChange={(e) => setPlatform(e.target.value)} />
                </div>

                <div className='FormInput'>
                    <h2 className='ratingLabel'>Rating</h2>
                    <Rating name='simple-controlled' value={rating} onChange={(e) => setRating(e.target.value)} />
                </div>

                <Button variant="contained" type='submit'>Submit</Button>
            </form>
        </div>
    );
};

export default AddRecord;