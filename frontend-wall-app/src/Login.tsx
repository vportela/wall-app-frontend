import React, { useState } from 'react';

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

    const [login, setLogin] = useState<LoginForm>(initialLogin)
    const [forgotPasswordMessage, setForgotPasswordMessage] =useState<string>("")

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault()
        console.log("i have been submitted")
        const customTarget = e.target as FormValues

        let password = customTarget.password.value
      
        let userName = customTarget.userName.value
       

        console.log(
            `
            User Name: ${userName},
            Password: ${password}
            `
        )
    }

    const handleClick = () => { 
       setForgotPasswordMessage("wow that sucks, thoughts & prayers")
    }

    return (
       <div>
       <div style={{display: "flex", alignItems: "center", justifyContent:"space-around"}}>
        <div>
          <h1>The Wall</h1>
        </div>
        <div>
          <button>Sign up</button>
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