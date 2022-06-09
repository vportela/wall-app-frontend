import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import {
  useNavigate
} from 'react-router-dom';
import { SafeUser } from './Login';

type WallPost = {
    id: number,
    text: string,
    userId: string,
    userName: string
}

type WallPostRequest = {
  text: string, 
  userId: string
}
type HomeProps = { 
  loggedInUser: SafeUser | undefined,
}

type User = { 
  id: number,
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
}


type FormValues = { 
  newMessage: {value: string}
} & EventTarget



function Home(props: HomeProps) {
  const[postFeedback, setPostFeedback] = useState<string>("")
  const[postFeedbackStyle, setPostFeedbackStyle] = useState<string>("")
  const [wallPosts, setWallPosts] = useState<WallPost[]>([])
  
  useEffect(() => { 
    console.log("in useEffect")
    axios.get<WallPost[]>("http://localhost:5000/posts")
      .then((response) => { 
        console.log("hooray it was successful!! with response", response)
        // const result = response.data
        // console.log("result from response ", result)
        setWallPosts(response.data)
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
    const lastInArray = wallPosts[wallPosts.length - 1]
    // if the user is undefined, dont let them post. you want to prevent
    //the call from ever going into the backend. 

    if(props.loggedInUser !== undefined) { 
      const requestBody: WallPostRequest = {
        text: newMessage,
        userId: props.loggedInUser.id
      }
      // let sendData = () => { //function definition doesnt submit until you call it
      axios.post<WallPost>("http://localhost:5000/posts", requestBody) //api call -
        .then((response) => { 
          console.log("New post successfully created! with response", response)
          
          setWallPosts([ ...wallPosts, response.data,])
        })//if call is successful, this line runs
        .catch((error) => {
          console.log("there was an error")
          if(error.response.status === 401){ 
            setPostFeedback(error.response.data)
            setPostFeedbackStyle("red")
        }
        })
    }
    
    console.log("wallposts", wallPosts)

  }

  
  let navigate = useNavigate();

  return (
    <div className="App">
  
    <div style={{display: "flex", alignItems: "center", justifyContent:"space-around"}}>
      <div>
        <h1 onClick={() => {navigate("/")}}>The Wall</h1>
        <div>
          <h6>logged in user: {props.loggedInUser?.userName}</h6>
        </div>
      </div>
      <div>
        <h4 style={{color: postFeedbackStyle}}>{postFeedback}</h4>
        <button onClick={() => {navigate("/registration")}}>Sign up</button>
        <button onClick={() => {navigate("/login")}}>Log in</button>
      </div>
    </div>

  
    {/* {If loggedInUser is NOT undefined && (render whats in here) } */}
    {props.loggedInUser !== undefined && (
      <div style={{display: "flex", justifyContent: "center"}}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name='newMessage'></input>
          <button >Say it on the wall</button>
        </form>
      </div>
    )} 
    
    <div>
      {/* try to keep backend and frontend names consistent */}
      {wallPosts.map((wallPost) => 
        <div key={wallPost.id}>
          <h4>{wallPost.userName}</h4>
          <p>{wallPost.text}</p>
          </div>
        )}
    </div>
    {/* <Registration/> */}
    {/* <Login/> */}
    
  </div>
  );
}

export default Home;
