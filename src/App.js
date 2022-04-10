import React from 'react';
import './App.css';
import Grid1 from './components/Grid1';
import Drawer1 from './components/Drawer1';
import Slider1 from './components/Slider1';
import Container from '@mui/material/Container';

function App() {
  return (
    <div className="App">
      <Drawer1/>
      <Container sx={{ display: "flex", justifyContent: "center"}}> 
        <Slider1/>
      </Container>
      <Grid1/>
    </div>
  );
}

export default App;
