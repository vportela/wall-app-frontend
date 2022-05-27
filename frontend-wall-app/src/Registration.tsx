import React, { useState } from 'react';

type RegistrationForm = {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
}

const initialRegistration = {
    firstName: "",
    lastName:"",
    userName:"",
    email:"",
}

type FormValues = { 
    firstName: {value:string},
    lastName: {value:string},
    userName: {value:string},
    email: {value:string},
} & EventTarget


function Registration() {

    const [registration, setRegistration] = useState<RegistrationForm>(initialRegistration)

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault()
        console.log("i have been submitted")
        const customTarget = e.target
    }

    return (
       <div>
       <div style={{display: "flex", alignItems: "center", justifyContent:"space-around"}}>
        <div>
          <h1>The Wall</h1>
        </div>
        <div>
          <button>Log in</button>
        </div>
      </div>

      <div>
           <h1>Sign up to write on the wall!</h1>
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
           <input type= "text" name='firstName' placeholder='First name'></input>
           <input type= "text" name='lastName' placeholder='Last name'></input>
           <input type= "text" name='userName' placeholder='User name'></input>
           <input type= "text" name='email' placeholder='Email'></input>
           <br/>
           <button>Sign me up!</button>
       </form >
       <h3>or</h3>
       <button>View wall as a guest</button>
      </div>
     
    );
}

export default Registration;