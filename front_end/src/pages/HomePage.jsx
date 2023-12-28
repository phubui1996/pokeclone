import { Link } from "react-router-dom"

export default function HomePage(){

    const isHomePage = location.pathname === '/';

    return(
        <>
        {isHomePage ? (
            <div>
        <h1>PokeClone</h1>
        </div>
        ) : (

            <h1>PokeClone</h1>
        )
}
        </>
    )
}