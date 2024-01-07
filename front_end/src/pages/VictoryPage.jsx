import { useNavigate, useOutletContext } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button"
import Sound from 'react-audio-player';
import victoryPageMusic from '/src/assets/BackgroundMusic/victorypage-music.wav'

const VictoryPage = () => {
    
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/main')
    }

    return(
        <div className='full_page_div' onClick={handleClick}>
            <div className="victory">
                <div>
                    <h1>VictoryVictory</h1><h1>Victory</h1><h1>VictoryVictory</h1>
                    <img src="https://media4.giphy.com/media/IQebREsGFRXmo/200w.gif?cid=6c09b952jb3gk3kmsx3c47an338tqhgysg53uam89h4z3h6m&ep=v1_gifs_search&rid=200w.gif&ct=s"/>
                    <h1>Victory</h1><h1>VictoryVictory</h1><h1>Victory</h1>
                </div>
            </div>
                <audio autoPlay src={victoryPageMusic} loop type="audio/wav" volume='0.2'>
                            </audio>
            <div className="victory_buttons">
                <Button onClick={handleClick}>continue</Button>
            </div>  
        </div>
    )
}

export default VictoryPage

