import { Link, useNavigate, useOutletContext } from "react-router-dom"
import { useEffect, useState } from 'react'


export default function HomePage() {
    const { isLoggedIn, setIsLoggedIn } = useOutletContext()

    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate('/landing')
        }
    }, [])

    return (
        <div className="full_page_div">
            <div id="home_page_div">
                <h1>PokeClone</h1>
                <Link to='main/'><button>New Game</button></Link>
                <Link to='loadgame/'><button>Load Game</button></Link>
            </div>
        </div>
    )
}