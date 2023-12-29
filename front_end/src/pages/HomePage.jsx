import { Link, useNavigate, useOutletContext } from "react-router-dom"


export default function HomePage(){
    const {isLoggedIn, setIsLoggedIn} = useOutletContext()
    const isHomePage = location.pathname === '/';

    const navigate = useNavigate()

    return(
        <>
        {isLoggedIn ? (
            <div>
        <h1>PokeClone</h1>
        </div>
        ) : (

            navigate('/landing')
        )
}
        </>
    )
}