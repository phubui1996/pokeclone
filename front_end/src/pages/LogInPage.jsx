import { useOutletContext, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { userApi } from "../components/utilities";
import Sound from 'react-audio-player';
import starterPageMusic from '/src/assets/BackgroundMusic/UntitledTrack01_Loopable.wav'

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
            setUser(response.data)
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

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        }
    }, [])
    return (
        <div className="full_page_div">
            <audio autoPlay src={starterPageMusic} loop type="audio/wav" volume='0.2'></audio>
            <div id='login_div'>
                <div className="form_div">
                    <h1>Log In</h1>
                    <form onSubmit={(e) => SubmitUser(e)} className="the_form">
                        <h5>Email: </h5>
                        <input
                            type='text'
                            placeholder="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <h5>Password: </h5>
                        <input
                            type='password'
                            placeholder="password"
                            required
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <button type='submit' className="form_button">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}