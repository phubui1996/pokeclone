import { Link } from "react-router-dom"

export default function HomePage(){

    const isHomePage = location.pathname === '/';

    return(
        <>
        {isHomePage ? (
            <div>
        <h1>PokeClone</h1>
        <Link to='game/'><button>New Game</button></Link>
        <Link to='loadgame/'><button>Load Game</button></Link>
        </div>
        ) : (

            <h1>PokeClone</h1>
        )
}
        </>
    )
}