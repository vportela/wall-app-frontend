import React, { useState } from 'react';

import './App.css';
import Login from './Login';
import Registration from './Registration';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

type WallPost = 
  {
    id: number,
    user: string,
    text: string,
  }


const initialMessages: WallPost[] = [
  {
    id: 1,
    user: "ya_boy_Tomm",
    text: "do you ever think about how birds don't have hands?"
  },

]

type FormValues = { 
  newMessage: {value: string}
} & EventTarget

function App() {


  const [messages, setMessages] = useState<WallPost[]>(initialMessages)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Say it on the wall has been clicked!")
    e.preventDefault();
    const customTarget = e.target as FormValues;
    let newMessage = customTarget.newMessage.value;
    console.log("newMessage" ,newMessage)
    const firstInArray = messages[0]

    setMessages(
      [
        {
          id: firstInArray.id + 1,
          user: "LOGGED IN USER",
          text: newMessage,
        },
        ...messages
      ]
    )
    newMessage = ""
  }


  return (
    <div className="App">
    <div style={{display: "flex", alignItems: "center", justifyContent:"space-around"}}>
      <div>
        <h1>The Wall</h1>
      </div>
      <div>
        <button>Sign up</button>
        <button>Log in</button>
      </div>
    </div>
    <div style={{display: "flex", justifyContent: "center"}}>
      
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name='newMessage'></input>
        <button >Say it on the wall</button>
      </form>
      
    </div>
    <div>
      {messages.map((message) =>
        <div key={message.id}>
          <h4>{message.user}</h4>
          <p>{message.text}</p>
          </div>
        )}
    </div>
    
    
  </div>
  );
}

export default App;
