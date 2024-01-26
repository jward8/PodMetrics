import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Rating, Typography, CircularProgress } from '@mui/material';

const AddRecord = () => {
    const dispatch = useDispatch();
    const podcasts = useSelector((state) => state.podcasts);
    const [selectedPodcast, setSelectedPodcast] = useState('');
    const [episode, setEpisode] = useState('');
    const [rating, setRating] = useState('');
    const [platform, setPlatform] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [episodeList, setEpisodesList] = useState(['']);

    // useEffect(() => {
    //     if (selectedPodcast) {
    //         fetch(`http://localhost:5000/api/v1/podcasts/episodes?podcast=${selectedPodcast}`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 setEpisodesList(data);
    //                 console.log(data);
    //             })
    //             .catch(error => {
    //                 console.error('Error:', error);
    //             });
    //     }
    // }, [selectedPodcast]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRecord = {
            podcast: selectedPodcast,
            episode: episode,
            rating: rating,
            platform: platform
        };

        setSelectedPodcast(podcasts.filter((podcast) => podcast.title === e.target.textContent)[0]._id);

        setEpisode(episodeList.filter((episode) => episode.title === e.target.textContent)[0]);

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
                        renderInput={(params) => <TextField {...params} label="Podcast Name" variant="outlined" />}
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
                                console.log(selectedPodcast);
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
                    getOptionLabel={(option) => option.title ?
                    option.title : ''}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label='Episode Name' variant='outlined' />}
                    variant='outlined'
                    onChange={(e) => { 
                        if (e.target.textContent) {
                            setEpisode(e.target.textContent);
                        } 
                        // setEpisode(e.target.value)
                    } }
                    value={episode}
                />

                <div className='FormInput'>
                    <TextField id='outlined-basic'
                        fullWidth label='Platform' variant='outlined' value={platform} onChange={(e) => setPlatform(e.target.value)} />
                </div>

                <div className='FormInput'>
                    <Typography component='legend'>Rating</Typography>
                    <Rating name='simple-controlled' value={rating} onChange={(e) => setRating(e.target.value)} />
                </div>

                <Button variant="contained" type='submit'>Submit</Button>
            </form>
        </div>
    );
};

export default AddRecord;