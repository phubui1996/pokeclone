import { Link, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import pokeLogo from '../assets/pokelogo.png'
import { userApi } from "./utilities";

export default function Navbar({user, setUser, isLoggedIn, setIsLoggedIn}) {
    
    const navigate = useNavigate();
    
    const handleLogOut = async() => {
      let response = await userApi.post("logout/")
      if (response.status === 204) {
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        delete api.defaults.headers.common["Authorization"]
        setIsLoggedIn(false)
        navigate("/signup")
      } 
    }

  return (
    <>
      <nav className="Navbar">
        <img id='logo' src={pokeLogo}></img>
        <div className="navLinks">
            <Link to="/"> Home </Link>
            <Link to="/register"> Sign Up </Link>
            {/* <Link to="/login"> Log In </Link> */}
            {user?
            <button onClick={handleLogOut}>Log Out</button>
            :
            null
          }
          </div>
      </nav>
    </>
  );
}
