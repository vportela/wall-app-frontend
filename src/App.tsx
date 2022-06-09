import React, { useState } from 'react';
import './App.css';
import Login, { SafeUser } from './Login';
import Registration from './Registration';
import Home from './Home';
import {
  Routes,
  Route,
} from 'react-router-dom';


// TODO: add login to session or local storage
// TODO: Associate the user created post to the user. (primary key and foreign key).
// TODO: display post made by the user
// TODO: display existing created posts
// TODO: database time babey. 

function App() {
  const [loggedInUser, setLoggedInUser] = useState<SafeUser>()
  console.log("loggedInUser", loggedInUser)
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home loggedInUser={loggedInUser} />}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser}/>}/>
        </Routes>
  </div>
  );
}

export default App;
