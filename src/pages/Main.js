import React from "react";
import Grid1 from '../components/Grid1';
import Drawer1 from '../components/Drawer1';
import Slider1 from '../components/Slider1';
import Container from '@mui/material/Container';
import Page1 from '../components/Page1';

const Main = () => {
  return (
    <div>
        <Drawer1/>
        <Container sx={{ display: "flex", justifyContent: "center"}}> 
            <Slider1/>
        </Container>
        <Page1/>
    </div>
  );
};

export default Main;