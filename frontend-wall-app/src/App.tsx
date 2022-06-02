import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import {
  Routes,
  Route,
} from 'react-router-dom';


function App() {

  return (
    <div className="App">
        <Routes>
          <Route path= "/" element={<Home/>}/>
          <Route path= "/registration" element={<Registration/>}/>
          <Route path= "/login" element={<Login/>}/>
        </Routes>
  </div>
  );
}

export default App;
