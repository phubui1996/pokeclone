import { useNavigate, useOutletContext } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button"

const VictoryPage = () => {
    
    const navigate = useNavigate()

    return(
        <>
            <div className="vitory">
                <h1>VictoryVictory</h1><h1>Victory</h1><h1>VictoryVictory</h1>
                <img src=""/>
                <h1>Victory</h1><h1>VictoryVictory</h1><h1>Victory</h1>
            </div>
            <div className="victory_buttons">
                <Button >Try Again?</Button>
                <Button >New Game</Button>
            </div>  
        </>
    )
}

export default VictoryPage