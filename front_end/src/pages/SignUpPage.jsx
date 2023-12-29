import { useState, useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router"
import { userApi } from "../components/utilities"


export default function SignUpPage() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [username, setUsername] = useState()

    const { user, setUser, isLoggedIn, setIsLoggedIn } = useOutletContext()

    const navigate = useNavigate()

    const SubmitUser = async (e) => {
        e.preventDefault()
        let response = await userApi.post("signup/", {
            email: email,
            password: password,
            user_name: username
        })

        if (response.status === 201) {
            setUser(response.data.User)
            localStorage.setItem("token", response.data.Token) //Had to change to capital T and U for token and user
            setIsLoggedIn(true)
            userApi.defaults.headers.common[
                "Authorization"
            ] = `Token ${response.data.Token}`;
            navigate("/landing");
        }
        else {
            alert("Something Went Wrong");
        }
    }


    return (
        <>
            <h1>SignUp Page</h1>
            {isLoggedIn ?

                <form onSubmit={(e) => SubmitUser(e)}>
                    <h3>Email: </h3>
                    <input
                        type='text'
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required></input>
                    <h3>Password: </h3>
                    <input type='password'
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                        required></input>
                    {/* <h3>Re-Enter Password: </h3>
                    <input type='text' placeholder="re-enter password" required></input> */}
                    <h3>Username: </h3>
                    <input type='text'
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required></input>
                    <button type="Sumbit">Signup</button>
                </form>
                : navigate('/')
            }
        </>
    )
}