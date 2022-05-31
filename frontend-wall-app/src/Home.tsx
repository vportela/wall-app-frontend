import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

type WallPost = {
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

const url = "http://localhost:5000"

function Home() {

  const [messages, setMessages] = useState<WallPost[]>(initialMessages)
  
  useEffect(() => { 
    console.log("in useEffect")
    axios.get<WallPost[]>(url + "/posts")
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
    const firstInArray = messages[messages.length -1]
    
    const myNewMessage = {
      id: firstInArray.id + 10, 
      user: "LOGGED IN USER",
      text: newMessage,
    }
  

  // const testMessage = [{id:100, user: "test user", text:"testingtesting 123"}];
 

  // let sendData = () => { //function definition doesnt submit until you call it
  axios.post<WallPost>(url+"/posts", myNewMessage) //api call -
    .then((response) => { 
      console.log("New post successfully created! with response", response)
      setMessages([response.data, ...messages])
    })//if call is successful, this line runs
    .catch((err) => {
      console.log("there was an error")
    })
  // }
  // sendData() //calling backend here 

  //so you need another axios.get to update the state 

    // try {
    //   axios.post("http://localhost:3000", myNewMessage)
    //   console.log("hello from inside submit")
    //   setMessages(myNewMessage)
    // } catch (error) {
    //   console.log(error)
    // }
    
  //   let payload = { id: 1, user: "testing user", text: "testing message"}
    
  //   axios.post("http://localhost:5000/posts", payload)
  //   console.log("payload", payload) 
  //  }
  //  makeGetRequest()




    }

    // setMessages(
    //   [
    //     {
    //       id: firstInArray.id + 1, 
    //       user: "LOGGED IN USER",
    //       text: newMessage,
    //     },
    //     ...messages
    //   ]
    // )
    // newMessage = ""
  // }


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
