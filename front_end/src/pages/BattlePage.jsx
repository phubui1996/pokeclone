import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { wildApi, pokeApi, teamApi } from '../components/utilities';

const BattlePage = () => {
    const [randomNum, setRandomNum] = useState("")
    const [currentOpponent, setCurrentOpponent] = useState([])
    const [currentPokemon, setCurrentPokemon] = useState([])
    const [currentPokemonHealth, setCurrentPokemonHealth] = useState(50)
    const [currentPokemonHealthTotal, setCurrentPokemonHealthTotal] = useState(50)
    const [currentPokemonExperience, setCurrentPokemonExperience] = useState(0)
    const [currentOpponentHealth, setCurrentOpponentHealth] = useState(50)
    const [currentOpponentHealthTotal, setCurrentOpponentHealthTotal] = useState(50)

    const navigate = useNavigate()

    function getRandomNum() {
        setRandomNum(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
    }

    console.log(randomNum)
    const wildPoke = async () => {
        //getRandomNum()
        let response = await wildApi.get(`${randomNum}`)
        console.log('wildapi', response.data)
        setCurrentOpponent(response.data)
        setCurrentOpponentHealth(response.data.hp)
        setCurrentOpponentHealthTotal(response.data.hp)
    }

    const getTemp = async () => {
        let response = await axios.get('https://pokeapi.co/api/v2/pokemon/3/')
        console.log('pokeapi', response.data)
        setCurrentPokemon(response.data)
        setCurrentPokemonHealth(response.data.stats[0].base_stat)
        setCurrentPokemonHealthTotal(response.data.stats[0].base_stat)
    }

    /////////////////ATTACK///////////////////////////////////////////////////////////

    const handleMove1 = () => {
        let attack = (Math.floor(Math.random() * (10 - 0 + 1)))
        let exp = (Math.floor(Math.random() * (10 - 5 + 1)) + 5)
        setCurrentOpponentHealth(currentOpponentHealth - attack)
        if (currentOpponentHealth <= 0) {
            console.log("player wins battle")
            setCurrentPokemonExperience(currentPokemonExperience + exp)
            navigate("/main")
        }
        else {
            console.log("opponent attack")
            let counterAttack = (Math.floor(Math.random() * (10 - 0 + 1)))
            setCurrentPokemonHealth(currentPokemonHealth - counterAttack)
        }
    }

    const handleMove2 = () => {
        let attack = (Math.floor(Math.random() * (10 - 0 + 1)))
        let exp = (Math.floor(Math.random() * (10 - 5 + 1)) + 5)
        setCurrentOpponentHealth(currentOpponentHealth - attack)
        if (currentOpponentHealth <= 0) {
            console.log("player wins battle")
            setCurrentPokemonExperience(currentPokemonExperience + exp)
            navigate("/main")
        }
        else {
            console.log("opponent attack")
            let counterAttack = (Math.floor(Math.random() * (10 - 0 + 1)))
            setCurrentPokemonHealth(currentPokemonHealth - counterAttack)
        }
    }

    console.log(currentOpponent)

    /////////////////RUN///////////////////////////////////////////////////////////

    const handleRun = () => {
        let runChance = (Math.floor(Math.random() * (5 - 1 + 1)) + 1)
        if (runChance < 4){
            //add post request to save experience and health
            navigate("/main")
        }
    }

    /////////////////CAPTURE///////////////////////////////////////////////////////

    const capturePoke = async () => {
        let data = {
            "id": currentOpponent.id
        };

        try {
            let response = await pokeApi.post(`${currentOpponent.id}/`, data);
            console.log("capture poke post", response, currentOpponent.id);

            if (response.status === 201) {
                navigate("/main");
            } else {
                alert("Poke not captured");
            }
        } catch (error) {
            console.error("Error capturing poke:", error);
        }
    };

    const handleCapture = () => {
        if (currentOpponentHealth < 2) {
            console.log("pokemon captured") //add post request
            capturePoke()
            //add to team if less than 6
        }
        else if (currentOpponentHealth / currentOpponentHealthTotal < .3){
            let captureChance = (Math.floor(Math.random() * (5 - 1 + 1)) + 1)
            if (captureChance < 4) {
                console.log("pokemon captured") //add post request
                capturePoke()
                //add to team if less than 6
            }
            else {
                console.log("pokemon capture failed")
                console.log("opponent attack")
                let counterAttack = (Math.floor(Math.random() * (10 - 0 + 1)))
                setCurrentPokemonHealth(currentPokemonHealth - counterAttack)
            }
        }
        else {
            let captureChance = (Math.floor(Math.random() * (10 - 1 + 1)) + 1)
            if (captureChance < 4) {
                console.log("pokemon captured") //add post request
                capturePoke()
                //add to team if less than 6
            }
            else {
                console.log("pokemon capture failed")
                console.log("opponent attack")
                let counterAttack = (Math.floor(Math.random() * (10 - 0 + 1)))
                setCurrentPokemonHealth(currentPokemonHealth - counterAttack)
            }
        }
    }

    ////////////////TIMING////////////////////////////////////////////////////////////

    useEffect(() => {
        getRandomNum()
    }, [])

    useEffect(() => {
        getTemp()
        wildPoke()
    },[randomNum])

    useEffect(() => {
        if (currentOpponentHealth < 1) {
            //post request to update pokemon experience and health
            navigate("/main")
        }
    }, [currentOpponentHealth])

    return (
        <div className='full_page_div'>
            {currentPokemon && currentOpponent ?
                (<div id='battle_div'>
                    <div id='battle_options_div'>
                        <div id='moves_div'>
                            <button onClick={handleMove1} className='battle_buttons'>{currentOpponent.move_1}</button>
                            <button onClick={handleMove2} className='battle_buttons'>{currentOpponent.move_2}</button>
                        </div>
                        <div id='other_options_div'>
                            <button onClick={handleCapture} className='battle_buttons'>Capture</button>
                            <button className='battle_buttons'>Change Pokemon</button>
                            <button onClick={handleRun} className='battle_buttons'>Run</button>
                        </div>
                    </div>
                    <div id='poke_div'>
                        <div id='your_pokemon_div'>
                            <div id='your_pokemon_status_div'>
                                <h3>{currentPokemon.name}</h3>
                                <div className='status_bar_div'>
                                    <ProgressBar max={currentPokemonHealthTotal} now={currentPokemonHealth} label={`${currentPokemonHealth}`} />
                                    <ProgressBar now={currentPokemonExperience} label={`${currentPokemonExperience}`} />
                                </div>
                                <img alt='poke' src={`${currentOpponent.back_img}`} className='pokemon_image' />
                            </div>
                        </div>
                        <div id='opponent_div'>
                            <div className='poke_profile'>
                                <h3>{currentOpponent.name}</h3>
                                <div className='status_bar_div'>
                                    <ProgressBar max={currentOpponentHealthTotal} now={currentOpponentHealth} label={`${currentOpponentHealth}`} />
                                </div>
                                <img src={`${currentOpponent.front_img}`} className='pokemon_image' />
                            </div>
                        </div>
                    </div>
                </div>) : ('loading...')
            }
        </div>
    )
}
export default BattlePage;