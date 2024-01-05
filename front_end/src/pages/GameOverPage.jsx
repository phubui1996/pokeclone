import { useNavigate, useOutletContext } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button"
import Sound from 'react-audio-player';
import gameOverPageMusic from '/src/assets/BackgroundMusic/victorypage-music.wav'

const GameOverPage = () => {
    
    const navigate = useNavigate()

    return(
        <>
            <div className="gameover">
                <audio autoPlay src={gameOverPageMusic} loop type="audio/wav" volume='0.2'></audio>
                <h1>TRASH</h1><h1>TRASH</h1><h1>TRASH</h1>
                <img src="https://media.giphy.com/media/WLXO8OZmq0JK8/giphy.gif"/>
                <h1>TRASH</h1><h1>TRASH</h1><h1>TRASH</h1>
            </div>
            <div className="gameover_buttons">
                <Button onClick={navigate('/pokecenter')}>Try Again?</Button>
                <Button onClick={navigate('/')}>New Game</Button>
            </div>  
        </>
    )
}

export default GameOverPage