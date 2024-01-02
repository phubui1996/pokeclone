import { Link, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import pokeLogo from '../assets/PokeLogoClean.png'
import { userApi } from "./utilities";

export default function Navbar({user, setUser, isLoggedIn, setIsLoggedIn}) {
    const [linkWords, setLinkWords] = useState('Log In')
    const [linkWordsLink, setLinkWordsLink] = useState('/login')
    
    const navigate = useNavigate();
    
    const handleLogOut = async() => {
      let response = await userApi.post("logout/")
      console.log(response.status)
      if (response.status === 204) {
        setUser("")
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        delete userApi.defaults.headers.common["Authorization"]
        setIsLoggedIn(false)
        navigate("/landing")
      } 
    }

    const signUpOrLogIn = () => {
      console.log(window.location.href)
      if (window.location.href === 'http://localhost:5173/signup') {
        setLinkWords('Log In')
        setLinkWordsLink('/login')
      }
      else if (window.location.href === 'http://localhost:5173/login') {
        setLinkWords('Sign Up')
        setLinkWordsLink('/signup')
      }
      else {
        setLinkWords('')
      }
    }

    console.log(isLoggedIn)

    useEffect(() => {
      signUpOrLogIn()
    })

  return (
    <>
      <nav className="Navbar" id='nav_bar'>
        <div className="navLinks">
            <img id='nav_logo' src={pokeLogo}></img>
            <Link to="/" className='nav_link'> Home </Link>
            <Link to={linkWordsLink}> {linkWords} </Link>
            {/* <Link to="/login"> Log In </Link> */}
            {isLoggedIn ?
            <Link onClick={handleLogOut} className='nav_link'>Log Out</Link>
            :
            null
          }
          </div>
      </nav>
    </>
  );
}
