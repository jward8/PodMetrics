import React, { useState} from 'react';
import Button from '@mui/material/Button';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

const AddRecord = () => {
    const dispatch = useDispatch();
    const podcasts = useSelector((state) => state.podcasts);
    const [selectedPodcast, setSelectedPodcast] = useState('');
    const [episode, setEpisode] = useState('');
    const [rating, setRating] = useState('');
    const [platform, setPlatform] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className='AddRecord'>
            <h3>Add Record</h3>
            <form className='AddForm' onSubmit={handleSubmit}>
                <div className='FormInput'>
                    <label htmlFor='selectedPodcast'>Podcast Name:</label>
                    {/* <input
                        type='text'
                        id='selectedPodcast'
                        value={selectedPodcast}
                        onChange={(e) => dispatch({ type: 'SET_SELECTED_PODCAST', payload: e.target.value })}
                    /> */}
                    <Autocomplete
                        id="combo-box-demo"
                        options={podcasts}
                        getOptionLabel={(option) => option.podName}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Podcast Name" variant="outlined" />} />
                    
                </div>

                <div className='FormInput'>
                    <label htmlFor='episode'>Episode:</label>
                    <input
                        type='text'
                        id='episode'
                        value={episode}
                        onChange={(e) => setEpisode(e.target.value)}
                    />
                </div>

                <div className='FormInput'>
                    <label htmlFor='rating'>Rating:</label>
                    <input
                        type='number'
                        id='rating'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </div>

                <div className='FormInput'>
                    <label htmlFor='platform'>Platform:</label>
                    <input
                        type='text'
                        id='platform'
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                    />
                </div>

                <Button variant="contained" type='submit'>Submit</Button>
            </form>
        </div>
    );
};

export default AddRecord;