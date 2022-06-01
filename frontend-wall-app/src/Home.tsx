import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

type WallPost = {
    id: number,
    user: string,
    text: string,
}



type FormValues = { 
  newMessage: {value: string}
} & EventTarget



function Home() {

  const [messages, setMessages] = useState<WallPost[]>([])
  
  useEffect(() => { 
    console.log("in useEffect")
    axios.get<WallPost[]>("http://localhost:5000/posts")
      .then((response) => { 
        console.log("hooray it was successful!! with response", response)
        // const result = response.data
        // console.log("result from response ", result)
        setMessages(response.data)
      })
      .catch(() => {
        console.log("uh oh! something went wrong.")
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // console.log("Say it on the wall has been clicked!")
    e.preventDefault();
    const customTarget = e.target as FormValues;
    let newMessage = customTarget.newMessage.value;
    // console.log("newMessage" ,newMessage)
    const lastInArray = messages[messages.length - 1]
    
    const myNewMessage = {
      id: lastInArray.id + 1, 
      user: "LOGGED IN USER",
      text: newMessage,
    }
  

  // const testMessage = [{id:100, user: "test user", text:"testingtesting 123"}];
 

  // let sendData = () => { //function definition doesnt submit until you call it
  axios.post<WallPost>("http://localhost:5000/posts", myNewMessage) //api call -
    .then((response) => { 
      console.log("New post successfully created! with response", response)
      setMessages([ ...messages, response.data,])
    })//if call is successful, this line runs
    .catch((err) => {
      console.log("there was an error")
    })
  // }
  // sendData() //calling backend here 

  //so you need another axios.get to update the state 

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
    {/* <Registration/> */}
    {/* <Login/> */}
    
  </div>
  );
}

export default Home;
