import axios from 'axios';
import React, { useState , useEffect} from 'react';
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

type RegistrationForm = {
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
}

const initialRegistration = {
    id: 0,
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

    const [registration, setRegistration] = useState<RegistrationForm[]>([])


    useEffect(() => { 
        console.log("in useEffect")
        axios.get<RegistrationForm[]>("http://localhost:5000/registration")
          .then((response) => { 
            console.log("hooray it was successful!! with response", response)
            const result = response.data
            console.log("result from response ", result)
            setRegistration(response.data)
          })
          .catch(() => {
            console.log("uh oh! something went wrong.")
          })
      }, [])

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault()
        console.log("i have been submitted")
        const customTarget = e.target as FormValues

        let firstName = customTarget.firstName.value
        let lastName = customTarget.lastName.value
        let userName = customTarget.userName.value
        let email = customTarget.email.value

        const lastInArray = registration[registration.length - 1]

        const newUser = { 
            id: lastInArray.id + 1,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email
        }

        console.log("newUser", newUser)

        axios.post<RegistrationForm>("http://localhost:5000/registration", newUser) //api call -
            .then((response) => { 
            console.log("New user successfully created! with response", response)
            setRegistration([ ...registration, response.data,])
            
            })//if call is successful, this line runs
            .catch((err) => {
            console.log("there was an error")
            })
    }

    // const handleClick = () => { 
    //     console.log("I will take u back to the main page")
    // }

    const HandleClick = () => { 
      let navigate = useNavigate();

      const handleClick = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        await (e.target);
        navigate("/", {replace: true});
        
      }
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
       <button onClick={(e) => HandleClick()}>View wall as a guest</button>
      </div>
     
    );
}

export default Registration;