import { useOutletContext, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { userApi } from "../components/utilities";

export default function LogInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { user, setUser, isLoggedIn, setIsLoggedIn } = useOutletContext()

    const navigate = useNavigate()

    const SubmitUser = async (e) => {
        e.preventDefault()
        let response = await userApi.post("login/", {
            email: email,
            password: password,
        })
        console.log(response)

        if (response.status === 200) {
            console.log(response.data.User)
            setUser(response.data.User)
            localStorage.setItem("token", response.data.Token)
            setIsLoggedIn(true)
            userApi.defaults.headers.common[
                "Authorization"
            ] = `Token ${response.data.Token}`;
            navigate("/");
        }
        else if (response.status === 400) {
            console.log("capture error")
        }
        else {
            alert("Something Went Wrong");
        }
    }
    return (
        <>
            <div>
                <form onSubmit={(e) => SubmitUser(e)}>
                    <h1>Log In</h1>
                    <h3>Email: </h3>
                    <input 
                        type='text' 
                        placeholder="email" 
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <h3>Password: </h3>
                    <input 
                        type='password' 
                        placeholder="password" 
                        required
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button type='submit'>Log In</button>
                </form>
            </div>
        </>
    )
}