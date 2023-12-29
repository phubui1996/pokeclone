import { Link, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import pokeLogo from '../assets/pokelogo.png'
import { userApi } from "./utilities";

export default function Navbar({user, setUser, isLoggedIn, setIsLoggedIn}) {
    const [linkWords, setLinkWords] = useState('Log In')
    const [linkWordsLink, setLinkWordsLink] = useState('/login')
    
    const navigate = useNavigate();
    
    const handleLogOut = async() => {
      let response = await userApi.post("logout/")
      console.log(response.status)
      if (response.status === 200) {
        setUser("")
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        delete api.defaults.headers.common["Authorization"]
        setIsLoggedIn(false)
        navigate("/signup")
      } 
    }

    const signUpOrLogIn = () => {
      if (window.location.href === '/signup') {
        linkWords = 'Log In'
      }
      else if (window.location.href === '/login') {
        linkWords = 'Sign Up'
      }
    }

    useEffect(() => {
      signUpOrLogIn()
    })

  return (
    <>
      <nav className="Navbar" id='nav_bar'>
        <div className="navLinks">
            <img id='nav_logo' src={pokeLogo}></img>
            <Link to="/"> Home </Link>
            <Link to={linkWordsLink}> {linkWords} </Link>
            {/* <Link to="/login"> Log In </Link> */}
            {isLoggedIn?
            <button onClick={handleLogOut}>Log Out</button>
            :
            null
          }
          </div>
      </nav>
    </>
  );
}
