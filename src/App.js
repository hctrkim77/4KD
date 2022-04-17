import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main, Auth, NotFound, SignUp, ResetPW } from "./pages";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer1 from './components/Drawer1';

const theme = createTheme({
  palette : { 
    primary: {
      main: '#ffffff',
    },
      },
      });

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Drawer1/>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/resetpw" element={<ResetPW />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
