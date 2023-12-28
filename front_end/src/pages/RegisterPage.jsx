import { useOutletContext, useNavigate } from "react-router-dom"
import LogIn from '../components/Login'
import SignUp from '../components/SignUp'
import pokeLogo from '../assets/pokelogo.png'
import { useState, useEffect } from "react";

export default function RegisterPage() {
    const {isLoggedIn, setIsLoggedIn, user, setUser} = useOutletContext()
    const [needLogin, setNeedLogin] = useState(false)
    
    const navigate = useNavigate()

    const continueOn = () => {
        navigate('/')
    }

    return (
        <>
            <h1>
                Register Page
            </h1>
            {isLoggedIn ? (
                continueOn()
            ) : (
                <div>
                    {/* <img id='logo' src={pokeLogo}></img> */}
                    {needLogin ? (
                        <div>
                            <button onClick={() => setNeedLogin(false)}>Sign Up</button>
                            <LogIn 
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        </div>
                    ) : (
                        <div>
                            <button onClick={() => setNeedLogin(true)}>Log In</button>
                            <SignUp
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        </div>
                    )}
                    <button onClick={() => setIsLoggedIn(true)}>User</button> {/*Change to token only, log in */}
                </div>
            )}
        </>
    )
}