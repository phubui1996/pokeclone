import { useState, useEffect } from 'react'
import axios from 'axios'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { wildApi } from '../components/utilities';

const BattlePage = () => {
    const [randomNum, setRandomNum] = useState(1)
    const [currentOpponent, setCurrentOpponent] = useState([])
    const [currentPokemon, setCurrentPokemon] = useState([])
    const [currentPokemonHealth, setCurrentPokemonHealth] = useState(50)
    const [currentPokemonHealthTotal, setCurrentPokemonHealthTotal] = useState(50)
    const [currentPokemonExperience, setCurrentPokemonExperience] = useState(0)
    const [currentOpponentHealth, setCurrentOpponentHealth] = useState(50)
    const [currentOpponentHealthTotal, setCurrentOpponentHealthTotal] = useState(50)
    
    function getRandomNum() {
        setRandomNum(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
    }

    const wildPoke = async () => {
        getRandomNum()
        let response = await wildApi.get(`${randomNum}`)
        console.log('wildapi',response.data)
        setCurrentOpponent(response.data)
        setCurrentOpponentHealth(response.data.hp)
        setCurrentOpponentHealthTotal(response.data.hp)
    }

    const getTemp = async () => {
        let response = await axios.get('https://pokeapi.co/api/v2/pokemon/1/')
        console.log('pokeapi',response.data)
        setCurrentPokemon(response.data)
        setCurrentPokemonHealth(response.data.stats[0].base_stat)
        setCurrentPokemonHealthTotal(response.data.stats[0].base_stat)
    }

    

    console.log(currentOpponent)
    

    useEffect(() => {
        getTemp()
        wildPoke()
    }, [])

    return (
        <div className='full_page_div'>
            {currentPokemon && currentOpponent ?
                (<div id='battle_div'>
                    <div id='opponent_div'>
                        <div className='poke_profile'>
                            <h3>{currentOpponent.name}</h3>
                            <div className='status_bar_div'>
                                <ProgressBar max={currentOpponentHealthTotal} now={currentOpponentHealth} label={`${currentOpponentHealth}`} />
                            </div>
                            <img src={`${currentOpponent.front_img}`} className='pokemon_image' />
                        </div>
                    </div>
                    <div id='your_pokemon_div'>
                        <div id='your_pokemon_status_div'>
                            <h3>{currentPokemon.name}</h3>
                            <div className='status_bar_div'>
                                <ProgressBar max={currentPokemonHealthTotal} now={currentPokemonHealth} label={`${currentPokemonHealth}`} />
                                <ProgressBar now={currentPokemonExperience} label={`${currentPokemonExperience}`} />
                            </div>
                            <img alt='poke' src={`${''}`} className='pokemon_image' />
                        </div>
                    </div>
                    <div id='battle_options_div'>
                        <div id='moves_div'></div>
                        <div id='other_options_div'></div>
                    </div>
                </div>) : ('loading...')
            }
        </div>
    )
}
export default BattlePage;