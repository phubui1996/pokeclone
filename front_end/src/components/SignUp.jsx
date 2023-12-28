import { useState, useEffect } from "react"
import { useOutletContext } from "react-router"


export default function SignUp(){
const [user, setUser] = useState([])
const [email, setEmail] = useState()
const [password, setPassword] = useState()
const[username, setUsername] = useState()

const SubmitUser = () => {
    const data = {
        email: email,
        password: password,
        username: username
    }
    setUser(data)
}

//     useEffect(() => {
//         console.log(user)
//       }, [SubmitUser()]);
    


    return(
        <>
        <h1>SignUp Page</h1>
        <form>
        <h3>Email: </h3>
        <input 
        type='text'
        placeholder="email"
        onChange={() => setEmail()}
         required></input>
        <h3>Password: </h3>
        <input type='text'
         placeholder="password"
         onChange={() => setPassword()}
         required></input>
        <h3>Re-Enter Password: </h3>
        <input type='text' placeholder="re-enter password" required></input>
        <h3>Username: </h3>
        <input type='text'
         placeholder="username"
         onChange={() => setUsername()}
         required></input>
        <button onSubmit={()  => SubmitUser()}>Signup</button>
        </form>
        </>
    )
}