import axios from 'axios';
import React, { useState } from 'react';
import {
  useNavigate
} from 'react-router-dom';

type User = {
    id: string,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    loggedIn: boolean
} 

type UserRequestBody = { 
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
}

type FormValues = { 
    firstName: {value:string},
    lastName: {value:string},
    userName: {value:string},
    email: {value:string},
    password: {value:string}
} & EventTarget


const Registration = () => {

  const navigate = useNavigate();

  const [registrationErrorMessage, setRegistrationErrorMessage] = useState<string>("")

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
      e.preventDefault()
      console.log("i have been submitted")
      const customTarget = e.target as FormValues

      const requestBody: UserRequestBody = { 
        firstName: customTarget.firstName.value,
        lastName: customTarget.lastName.value,
        userName: customTarget.userName.value,
        email: customTarget.email.value,
        password: customTarget.password.value,
      }
      console.log("requestBody", requestBody)

      axios.post<User>("http://localhost:5000/registration", requestBody) //api call -
          .then((response) => { 
            console.log("New user successfully created! with response", response)
            navigate("/login")
          })//if call is successful, this line runs
          .catch((err) => {
            console.log("there was an error")
            setRegistrationErrorMessage("Something went wrong, please try again.")
          })
  }

    

  return (
    <div>
      <div style={{display: "flex", alignItems: "center", justifyContent:"space-around"}}>
        <div>
          <h1 onClick={() => {navigate("/")}}>The Wall</h1>
        </div>
        <div>
          <button onClick={() => {navigate("/login")}} >Log in</button>
        </div>
      </div>
      <div>
        <h1>Sign up to write on the wall!</h1>
      </div>

      <form 
        style={{
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          flexDirection: "column"
        }}
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <input type= "text" name='firstName' placeholder='First name'></input>
        <input type= "text" name='lastName' placeholder='Last name'></input>
        <input type= "text" name='userName' placeholder='User name'></input>
        <input type= "text" name='email' placeholder='Email'></input>
        <input type= "password" name='password' placeholder='Password'></input>
        <br/>
        <button>Sign me up!</button>
        <h5 style={{color: "red"}}>{registrationErrorMessage}</h5>
        </form >
        <h3>or</h3>
        <button onClick={() => {navigate("/")}}>View wall as a guest</button>
    </div>
  
  );
}

export default Registration;