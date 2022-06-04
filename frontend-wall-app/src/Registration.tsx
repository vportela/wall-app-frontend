import axios from 'axios';
import React, { useState , useEffect} from 'react';
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

// const users = {
//     id: 0,
//     firstName: "",
//     lastName:"",
//     userName:"",
//     email:"",
// }

type FormValues = { 
    firstName: {value:string},
    lastName: {value:string},
    userName: {value:string},
    email: {value:string},
    password: {value:string}
} & EventTarget


const Registration = () => {

  const navigate = useNavigate();


  const [users, setUsers] = useState<User[]>([])
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState<string>("")
  

  useEffect(() => { 
      console.log("in useEffect")
      axios.get<User[]>("http://localhost:5000/registration")
        .then((response) => { 
          console.log("hooray it was successful!! with response", response)
          const result = response.data
          console.log("result from response ", result)
          setUsers(response.data)
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
      let password = customTarget.password.value

      const lastInArray = users[users.length - 1]

      const newUser: User = { 
          id: (Number(lastInArray.id) + 1).toString(),
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          email: email,
          password: password,
          loggedIn: false
      }

      console.log("newUser", newUser)

      axios.post<User>("http://localhost:5000/registration", newUser) //api call -
          .then((response) => { 
            console.log("New user successfully created! with response", response)
            setUsers([ ...users, response.data])
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