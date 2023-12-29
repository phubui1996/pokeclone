import { Link } from 'react-router-dom'
import pokeLogo from '../assets/pokelogo.png'

const LandingPage = () => {
  
    return (
        <div className='full_page_div' id='landing_main_div'>
            <img src={pokeLogo} id='landing_logo'/>
            <Link to='/signup'><button className='landing_buttons'>Sign Up</button></Link>
            <Link to='/login'><button className='landing_buttons'>Log In</button></Link>
        </div>
    )
}
export default LandingPage;