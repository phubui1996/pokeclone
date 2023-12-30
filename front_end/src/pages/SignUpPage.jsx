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
            username: username
        })

        if (response.status === 201) {
            setUser(response.data.User)
            localStorage.setItem("token", response.data.Token) //Had to change to capital T and U for token and user
            setIsLoggedIn(true)
            userApi.defaults.headers.common[
                "Authorization"
            ] = `Token ${response.data.Token}`;
            navigate("/");
        }
        else {
            alert("Something Went Wrong");
        }
    }


    return (
        <div className="full_page_div">
            <div id='signup_div'>
                <div className="form_div">
                    <h1>Sign Up</h1>
                    <form onSubmit={(e) => SubmitUser(e)} className="the_form">
                        <h5>Email: </h5>
                        <input
                            type='text'
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required></input>
                        <h5>Password: </h5>
                        <input type='password'
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                            required></input>
                        {/* <h5>Re-Enter Password: </h5>
                    <input type='text' placeholder="re-enter password" required></input> */}
                        <h5>Username: </h5>
                        <input type='text'
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                            required></input>
                        <button type="Sumbit" className="form_button">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}