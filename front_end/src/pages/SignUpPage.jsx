import { useState, useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router"
import { userApi } from "../components/utilities"
import starterPageMusic from '/src/assets/BackgroundMusic/waves-on-beach.wav'
import seagulls from '/src/assets/BackgroundMusic/seagulls.wav'

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
            setUser(response.data)
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

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [])


    return (
        <div className="full_page_div">
            <audio autoPlay src={starterPageMusic} loop type="audio/wav" volume='0.2'></audio>
            <audio autoPlay src={seagulls} loop type="audio/wav" volume='0.2'></audio>
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