import React, { useEffect, useState } from 'react';
import './App.css';
import Login, { SafeUser } from './Login';
import Registration from './Registration';
import Home from './Home';
import {
  Routes,
  Route,
} from 'react-router-dom';
import axios from 'axios';

// TODO: email whoever you need to email and say you are done and send github urls, frontend
// AND backend links. 
// TODO: complete readme, explain how the app does and give a quick description. 1-2 lines and
// how to get it started (this is in the vid)
//TODO: spend another couple hours on this cleaning up the TODOS making things simpler
//TODO: explain and understand all the code 

function App() {

  const [loggedInUser, setLoggedInUser] = useState<SafeUser>()
  console.log("loggedInUser", loggedInUser)

  useEffect(() => {
    axios.get<SafeUser>("http://localhost:5000/authenticate")
      .then(response => {
        console.log("response", response)
        setLoggedInUser(response.data)
      })
      .catch(error => { 
        console.log("error", error)
      })
  },[])

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser}/>}/>
        </Routes>
  </div>
  );
}

export default App;
