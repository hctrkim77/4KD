import React from 'react';
import './App.css';
import Drawer1 from './components/Drawer1';
import Grid1 from './components/Grid1';
import ButtonG from './components/ButtonG';
import BNav from './components/BNav';

function App() {
  return (
    <div className="App">
      <Drawer1/>
      <ButtonG/>
      <Grid1/>
      <BNav/>
    </div>
  );
}

export default App;
