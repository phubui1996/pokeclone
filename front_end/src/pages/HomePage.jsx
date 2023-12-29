import { Link, useNavigate, useOutletContext } from "react-router-dom"


export default function HomePage() {
    const { isLoggedIn, setIsLoggedIn } = useOutletContext()

    const navigate = useNavigate()

    return (
        <>
            {isLoggedIn ? (
                <div>
                    <h1>PokeClone</h1>
                    <Link to='game/'><button>New Game</button></Link>
                    <Link to='loadgame/'><button>Load Game</button></Link>
                </div>
            ) : (

                navigate('/landing')
            )
            }
        </>
    )
}