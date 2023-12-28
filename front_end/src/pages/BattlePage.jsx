import { useState, useEffect } from 'react'
import axios from 'axios'
import ProgressBar from 'react-bootstrap/ProgressBar';

const BattlePage = () => {
    const [currentOpponent, setCurrentOpponent] = useState()
    const [currentPokemon, setCurrentPokemon] = useState([])
    const [currentPokemonHealth, setCurrentPokemonHealth] = useState(50)
    const [currentPokemonExperience, setCurrentPokemonExperience] = useState(0)
    const [currentOpponentHealth, setCurrentOpponentHealth] = useState(50)
   

    const getTemp = async () => {
        let response = await axios.get('https://pokeapi.co/api/v2/pokemon/1/')
        console.log(response.data)
        setCurrentPokemon(response.data)
    }

    useEffect(() => {
        getTemp()
    },[])

    return (
        <div className='full_page_div'>
            {/* {currentPokemon ?  */}
            (<div id='opponent_div'>
                <img src={currentPokemon.sprites.front_default}/>
                <div className='status_bar_div'>
                    <ProgressBar now={currentOpponentHealth} label={`${currentOpponentHealth}`} />;
                </div>
            </div>
            <div id='your_pokemon_div'>
                <div id='your_pokemon_status_div'>
                    <h3>{currentPokemon.name}</h3>
                    <img src={currentPokemon.sprites.back_default}/>
                    <div className='status_bar_div'>
                        <ProgressBar now={currentPokemonHealth} label={`${currentPokemonHealth}`} />;
                        <ProgressBar now={currentPokemonExperience} label={`${currentPokemonExperience}`} />;
                    </div>
                </div>
                <div id='battle_options_div'>
                    <div id='moves_div'></div>
                    <div id='other_options_div'></div>
                </div>
            </div>)
                {/* : (loading...)
            } */}
        </div>
    )
}
export default BattlePage;