import { useOutletContext, useNavigate } from "react-router-dom";

const IntroPage = () => {
    const { pokeTeam, user } = useOutletContext()

    const navigate = useNavigate()

    console.log("poke team check:",pokeTeam)
    
    const handleClick = () => {
        navigate('/main')
    }
    
    return (
        <div className="full_page_div" onClick={handleClick}>
            <div id="intro_div">
                <div id="intro_block1">
                    <h2>Your journey begins, {user.User}</h2>
                </div>
                <div id="intro_block2">
                    <h2>Battle and collect more pokemon to defeat the gym leader!</h2>
                </div>
            </div>

        </div>
    )
}

export default IntroPage;