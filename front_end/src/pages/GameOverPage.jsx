import { useNavigate, useOutletContext } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button"

const GameOverPage = () => {
    
    const navigate = useNavigate()

    return(
        <>
            <div className="gameover">
                <h1>TRASH</h1><h1>TRASH</h1><h1>TRASH</h1>
                <img src="https://media.giphy.com/media/WLXO8OZmq0JK8/giphy.gif"/>
                <h1>TRASH</h1><h1>TRASH</h1><h1>TRASH</h1>
            </div>
            <div className="gameover_buttons">
                <Button onClick={navigate('')}>Try Again?</Button>
                <Button onClick={navigate('')}>New Game</Button>
            </div>  
        </>
    )
}

export default GameOverPage