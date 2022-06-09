import React, { useState } from 'react';
import './App.css';
import Login, { SafeUser } from './Login';
import Registration from './Registration';
import Home from './Home';
import {
  Routes,
  Route,
} from 'react-router-dom';

// TODO: Associate the user created post to the user. (primary key and foreign key).
//user id should display the user that created the post
//add some more users to the backend, make the posts associate with the existing users.
// TODO: display existing created posts
  //set up initial data
// TODO: display all posts and their associated users
// TODO: database time babey. 

function App() {
  const localStorageUser: SafeUser | undefined = JSON.parse(localStorage.getItem('loggedInUser')!) 
  const [loggedInUser, setLoggedInUser] = useState<SafeUser | undefined>(localStorageUser)
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
