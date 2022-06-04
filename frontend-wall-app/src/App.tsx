import React, { useState } from 'react';
import './App.css';
import Login, { SafeUser } from './Login';
import Registration from './Registration';
import Home from './Home';
import {
  Routes,
  Route,
} from 'react-router-dom';


function App() {
  const [loggedInUser, setLoggedInUser] = useState<SafeUser>()

  return (
    <div className="App">
        <Routes>
          <Route path= "/" element={<Home loggedInUser={loggedInUser}/>}/>
          <Route path= "/registration" element={<Registration/>}/>
          <Route path= "/login" element={<Login setLoggedInUser={setLoggedInUser}/>}/>
        </Routes>
  </div>
  );
}

export default App;
