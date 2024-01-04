import React, { useState} from 'react';
import './Add-Podcast.css';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';


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
        <div className='AddPage'>
            <h3>What's the Podcast?</h3>
            <form onSubmit={handleSubmit} className='AddForm'>
                <div className='FormInput'>
                    <label htmlFor='podcastName'>Podcast Name:</label>
                    <input
                        type='text'
                        id='podcastName'
                        value={podcastName}
                        onChange={(e) => setPodcastName(e.target.value)}
                    />
                </div>

                <div className='FormInput'>
                    <label htmlFor='rssFeed'>RSS Feed:</label>
                    <input
                        type='text'
                        id='rssFeed'
                        value={rssFeed}
                        onChange={(e) => setRssFeed(e.target.value)}
                    />
                </div>
                <Button variant="contained" type='submit'>Add Podcast</Button>
            </form>
            { alertVisible && <Alert className='successAlert' severity="success">Podcast Added!</Alert>}
        </div>
    );
};

export default AddPodcast;