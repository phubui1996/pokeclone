import { useNavigate, useOutletContext } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button"
import Sound from 'react-audio-player';
import landingMusic from '/src/assets/BackgroundMusic/UntitledTrack01_Loopable.wav'

const VictoryPage = () => {
    
    const navigate = useNavigate()

    return(
        <>
            <div className="vitory">
                <h1>VictoryVictory</h1><h1>Victory</h1><h1>VictoryVictory</h1>
                <img src=""/>
                <h1>Victory</h1><h1>VictoryVictory</h1><h1>Victory</h1>
            </div>
                <audio autoPlay src={landingMusic} loop type="audio/wav" volume='0.2'>
                            </audio>
            <div className="victory_buttons">
                <Button >Try Again?</Button>
                <Button >New Game</Button>
            </div>  
        </>
    )
}

export default VictoryPage
