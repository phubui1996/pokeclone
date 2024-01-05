import { useNavigate, useOutletContext } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button"
import Sound from 'react-audio-player';
import landingMusic from '/src/assets/BackgroundMusic/UntitledTrack01_Loopable.wav'

const VictoryPage = () => {
    
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/main')
    }

    return(
        <div className='full_page_div' onClick={handleClick}>
            <div className="victory">
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
        </div>
    )
}

export default VictoryPage
