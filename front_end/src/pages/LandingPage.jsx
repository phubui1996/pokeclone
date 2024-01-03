import { Link } from 'react-router-dom'
import pokeLogo from '../assets/PokeLogoClean.png'
import Sound from 'react-audio-player';
import landingMusic from '/src/assets/BackgroundMusic/UntitledTrack01_Loopable.wav'

const LandingPage = () => {

  
    return (
        <div className='full_page_div' id='landing_main_div'>
            <img src={pokeLogo} id='landing_logo'/>
            <Link to='/signup'><button className='landing_buttons'>Sign Up</button></Link>
            <Link to='/login'><button className='landing_buttons'>Log In</button></Link>
            <audio autoPlay src={landingMusic} loop type="audio/wav" volume='0.2'>
            </audio>
        </div>
    )
}
export default LandingPage;