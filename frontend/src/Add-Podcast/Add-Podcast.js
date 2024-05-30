import React, { useState} from 'react';
import './Add-Podcast.css';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const AddPodcast = () => {
    const [podcastName, setPodcastName] = useState('');
    const [rssFeed, setRssFeed] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new podcast object
        const newPodcast = {
            podName: podcastName,
            feed: rssFeed
        };

        console.log(newPodcast);

        // Send the data as a POST request to the server
        fetch('http://localhost:5000/api/v1/podcasts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPodcast)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                console.log(data);
                // Reset the form
                setPodcastName('');
                setRssFeed('');
                setAlertVisible(true);
                setTimeout(() => {
                    setAlertVisible(false);
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        !alertVisible ? (<div className='AddPage'>
            <h3>What's the Podcast?</h3>
            <form onSubmit={handleSubmit} className='AddForm'>
                <div className='FormInput'>
                    <TextField
                        id='podcastName'
                        label='Podcast Name'
                        value={podcastName}
                        variant='filled'
                        sx={{ input: { color: 'white'} }}
                        onChange={(e) => setPodcastName(e.target.value)}
                    />  
                </div>

                <div className='FormInput'>
                    <TextField
                        id='rssFeed'
                        label='RSS Feed'
                        value={rssFeed}
                        variant='filled'
                        sx={{ input: { color: 'white'} }}
                        onChange={(e) => setRssFeed(e.target.value)}
                    />
                </div>
                <Button 
                    variant="contained" 
                    type='submit' 
                    endIcon={alertVisible ? <EmojiEmotionsIcon/> : <AddCircleOutlineIcon/>}
                    color={alertVisible ? 'success' : 'primary'}>
                        {alertVisible ? 'Podcast Added!' : 'Add Podcast'}
                </Button>
            </form>
        </div>) :
        <div className='Alert'>
            <CheckCircleIcon color='success' fontSize='large'/>
            <h3>Podcast Added!</h3>
        </div>
    );
};

export default AddPodcast;