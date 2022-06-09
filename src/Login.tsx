import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

type LoginForm = {
    userName: string,
    password: string,
}

type User = {
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string
} 
export type SafeUser = { 
    id: string,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    loggedIn: boolean
}

type LoginProps = { 
    setLoggedInUser: (safeUser: SafeUser) => void //recieves safe user as a value, returns nothing(void)
}
const initialLogin = {
    userName:"",
    password:"",
}

type FormValues = { 
    userName: {value:string},
    password: {value:string},
} & EventTarget

function Login(props: LoginProps) {

    let navigate = useNavigate();

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

        //calling my api and passing in my loginInfo which goes into my request body.
        //in the backend: first try finding a user whos username and password match 
        //my request body. 
        //if i find one, send a successful response.
        //if i dont find one, return a 400.
        //back to front end: when i find one, i redirect user to home directory
        //if the response is not successful (.catch) with a 400 status, i show
        //the error recieved fromthe backend. otherwise display generic error message.
        axios.post<SafeUser>("http://localhost:5000/login", loginInfo) //api call and passing into the request 
            //body, the login form
          .then((response) => { 
            console.log("user successfully logged in", response.data)
            props.setLoggedInUser(response.data)
            localStorage.setItem("loggedInUser", JSON.stringify(response.data))
            navigate("/")
          })
          .catch((error) => {
            console.log("there was an error", error)
            if(error.response.status === 400){ 
                setLoginFeedback(error.response.data)
                setLoginFeedbackStyle("red")
            } else { 
                setLoginFeedback("Something went wrong, please try again.")
                setLoginFeedbackStyle("red")
            }
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
           <input type= "password" name='password' placeholder='Password'></input>
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