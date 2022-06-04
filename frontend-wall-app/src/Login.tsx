import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

type LoginForm = {
    userName: string,
    password: string,
}

const initialLogin = {
    userName:"",
    password:"",
}

type FormValues = { 
    userName: {value:string},
    password: {value:string},
} & EventTarget


function Login() {

    let navigate = useNavigate();

    const [login, setLogin] = useState<LoginForm>(initialLogin)
    const [forgotPasswordMessage, setForgotPasswordMessage] =useState<string>("")
    const [loginFeedback, setLoginFeedback] = useState<string>("")
    const [loginFeedbackStyle, setLoginFeedbackStyle] = useState<string>("black")


    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault()
        console.log("i have been submitted")
        const customTarget = e.target as FormValues

        let password = customTarget.password.value
        let userName = customTarget.userName.value

        const loginInfo = { 
            userName: userName,
            password: password
        }
       

        console.log(`User Name: ${userName}, Password: ${password}`)

        axios.post<LoginForm>("http://localhost:5000/login", loginInfo) //api call -
          .then((response) => { 
            console.log("login info successfully sent to the backend", response.data)
            
          })
          .catch((err) => {
            console.log("there was an error")
            setLoginFeedback("Cannot find that username or password, please try again.")
            setLoginFeedbackStyle("red")
          })
    }

    const handleClick = () => { 
       setForgotPasswordMessage("wow that sucks, thoughts & prayers")
    }

    return (
       <div>
       <div style={{display: "flex", alignItems: "center", justifyContent:"space-around"}}>
        <div>
          <h1 onClick={() => {navigate("/")}}>The Wall</h1>
        </div>
        <div>
          <button onClick={() => {navigate("/registration")}}>Sign up</button>
        </div>
      </div>

      <div>
           <h1>Log in to write on the wall!</h1>
       </div>

       <form 
        style=
            {
                {
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    flexDirection: "column"
                }
            }
        onSubmit={(e) => handleFormSubmit(e)}
        >
            <h6 style={{color: `${loginFeedbackStyle}`}}>{loginFeedback}</h6>
           <input type= "text" name='userName' placeholder='User name'></input>
           <input type= "text" name='password' placeholder='Password'></input>
           <br/>
           <button>Log in!</button>
       </form >
       <h3>or</h3>
       <button onClick={() => handleClick()} >Forgot Password</button>
       <p>{forgotPasswordMessage}</p>
      </div>
     
    );
}

export default Login;