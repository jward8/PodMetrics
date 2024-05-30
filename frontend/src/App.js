import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPodcast from './Add-Podcast/Add-Podcast';
import Home from './Home/Home';
import AddRecord from './Add-Record/Add-Record';
import { Box, Modal, IconButton, ThemeProvider, createTheme, CssBaseline} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PostAddIcon from '@mui/icons-material/PostAdd';

function App() {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});//[title, content, buttons
  const darkTheme = createTheme({ palette: { mode: 'dark' } });

  const handleOpen = (content) => { 
    setOpen(true); 
    setModalContent(content);
  };
  const handleClose = () => { setOpen(false); };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
      <div className="App">
        <header className="App-header">

        <Modal
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={open} 
            onClose={handleClose}
          >
            <Box className="modalContent" id={modalContent === 'podcast' ? 'podcast' : 'record'}>
              {modalContent === 'podcast' ? <AddPodcast /> : <AddRecord />}
            </Box>
          </Modal>
          
          <div className="Links">
            
            <IconButton aria-label='add a podcast' color='main' onClick={() => {handleOpen('podcast')}} className='linkItem'>
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton aria-label='add a record' color='main' onClick={() => { handleOpen('record')}}className='linkItem'>
              <PostAddIcon />
            </IconButton>

          </div>
          
          
        </header>
        <div className="Content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
