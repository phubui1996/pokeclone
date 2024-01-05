import { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { wildApi, pokeApi, teamApi } from '../components/utilities';
import battlemusic1 from '/src/assets/BattleMusic/MeltdownTheme_Loopable.wav'
import { Howl } from 'howler';
import Modal from 'react-modal';
import rejection_sound from '/src/assets/BattleMusic/489366__morjon17__rejected_feedback.wav'

const BattlePage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [randomNum, setRandomNum] = useState()
    const [currentOpponent, setCurrentOpponent] = useState("")
    const [currentPokemon, setCurrentPokemon] = useState()
    const [currentPokemonHealth, setCurrentPokemonHealth] = useState()
    const [currentPokemonHealthTotal, setCurrentPokemonHealthTotal] = useState()
    const [currentPokemonExperience, setCurrentPokemonExperience] = useState(0)
    const [exp, setExp] = useState(0)
    const [currentPokemonLevel, setCurrentPokemonLevel] = useState()
    const [currentOpponentHealth, setCurrentOpponentHealth] = useState()
    const [currentOpponentHealthTotal, setCurrentOpponentHealthTotal] = useState()

    //const [trigger, setTrigger] = useState(false)

    // const [pokeDeath, setPokeDeath] = useState(false)

    const { pokeTeam, setPokeTeam, user, isLoggedIn } = useOutletContext()

    const navigate = useNavigate()

    const rejection = new Howl({
        src: [rejection_sound],
    });

    function getRandomNum() {
        setRandomNum(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
    }

    //console.log(randomNum)
    const wildPoke = async () => {
        let response = await wildApi.get(`${randomNum}`)
        //console.log('wildapi', response.data)
        setCurrentOpponent(response.data)
        setCurrentOpponentHealth(response.data.hp)
        setCurrentOpponentHealthTotal(response.data.base_hp)
    }

    const getTeam = async () => {
        console.log("getting team")
        try {

            teamApi.defaults.headers.common[
                "Authorization"
            ] = `Token ${user.Token}`;

            let response = await teamApi.get('manager/');
            //console.log("get team", response.data[0].pokemons);

            if (response.status === 200) {
                setPokeTeam(response.data[0].pokemons)
                //console.log('the team down here', response.data[0].pokemons[0])
                setCurrentPokemon(response.data[0].pokemons[0].user_pokemon.pokemon)
                setCurrentPokemonHealth(response.data[0].pokemons[0].user_pokemon.pokemon.hp)
                setCurrentPokemonHealthTotal(response.data[0].pokemons[0].user_pokemon.pokemon.base_hp)
                setCurrentPokemonLevel(response.data[0].pokemons[0].user_pokemon.pokemon.lvl)
                setCurrentPokemonExperience(response.data[0].pokemons[0].user_pokemon.pokemon.xp)
            } else {
                alert("Error retrieving team");
            }
        } catch (error) {
            console.error("Error retrieving team:", error);
        }
    };

    const saveHealthXP = async () => {
        console.log("saving health and xp...")
        try {
            pokeApi.defaults.headers.common[
                "Authorization"
            ] = `Token ${user.Token}`;

            let data = {
                'pokemon_id': currentPokemon.id,
                'hp': currentPokemonHealth,
                'base_hp': currentPokemon.base_hp,
                'xp': currentPokemonExperience,
                'lvl': currentPokemonLevel,
                "name": currentPokemon.name,
                "type": currentPokemon.type,
                "move_1": currentPokemon.move_1,
                "move_2": currentPokemon.move_2,
                "front_img": currentPokemon.front_img,
                "back_img": currentPokemon.back_img,
            }

            let response = await pokeApi.put(`${currentPokemon.id}/`, data); //updates pokemon stats
            //console.log("get team", response.data);

            if (response.status === 200) {
                console.log("poke info saved") //change current pokemon to selected pokemon
            } else {
                alert("Error retrieving team");
            }
        } catch (error) {
            console.error("Error retrieving team:", error);
        }
    }

    ////////////CHANGE POKEMON///////////////////////////////////////////////////////////

    const openModal = async () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleOptionClick = async (poke) => {
        //save current pokemon health/exp
        await saveHealthXP();
        await getTeam()
        setCurrentPokemon(poke)
        setCurrentPokemonHealth(poke.hp)
        //console.log('still saving?')
        setCurrentPokemonExperience(poke.xp)
        setCurrentPokemonHealthTotal(poke.base_hp)
        setCurrentPokemonLevel(poke.lvl)
        closeModal();
    };

    /////////////////ATTACK///////////////////////////////////////////////////////////

    const handleMove1 = async () => {
        console.log('starting attack')
        let attack = (Math.floor(Math.random() * (10 - 0 + 1) * currentPokemon.lvl))
        setExp(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
        //console.log("current exp: ", exp)
        setCurrentOpponentHealth(currentOpponentHealth - attack)
        setCurrentPokemonExperience(currentPokemonExperience + exp)
        if (currentOpponentHealth > 0) {
            //console.log("attacking")
            setTimeout(async () => {
                console.log("opponent attack")
                let counterAttack = (Math.floor(Math.random() * (10 - 0 + 1) * currentPokemon.lvl))
                setCurrentPokemonHealth(currentPokemonHealth - counterAttack)
                if (currentPokemonHealth <= 0) {
                    handleDeath()
                }
                //console.log("health set")
                //console.log("attacked")
                await saveHealthXP()
            }, 500);
            if (currentOpponentHealth < 1) {
                console.log('player win')
                handleWin()
            }
        }
        else {
            console.log('player win 2')
            handleWin()
        }
    }

    const handleMove2 = async () => {
        console.log('starting attack')
        let attack = (Math.floor(Math.random() * (10 - 0 + 1) * currentPokemon.lvl))
        setExp(Math.floor(Math.random() * (5 - 1 + 1)) + 1);
        //console.log("current exp: ", exp)
        setCurrentOpponentHealth(currentOpponentHealth - attack)
        setCurrentPokemonExperience(currentPokemonExperience + exp)
        if (currentOpponentHealth > 0) {
            //console.log("attacking")
            setTimeout(async () => {
                console.log("opponent attack")
                let counterAttack = (Math.floor(Math.random() * (10 - 0 + 1) * currentPokemon.lvl))
                setCurrentPokemonHealth(currentPokemonHealth - counterAttack)
                if (currentPokemonHealth <= 0) {
                    handleDeath()
                }
                //console.log("health set")
                //console.log("attacked")
                await saveHealthXP()
            }, 500);
            if (currentOpponentHealth < 1) {
                console.log('player win')
                handleWin()
            }
        }
        else {
            console.log('player win 2')
            handleWin()
        }
    }

    //console.log(currentOpponent)

    /////////////////WIN///////////////////////////////////////////////////////////

    const handleWin = async () => {
        saveHealthXP()
        //console.log("player wins battle")
        //console.log('poke experience', exp)
        console.log("battle complete")
        navigate('/main')
    }

    /////////////////RUN///////////////////////////////////////////////////////////

    const handleRun = async () => {
        let runChance = (Math.floor(Math.random() * (5 - 1 + 1)) + 1)
        if (runChance < 4) {
            await saveHealthXP() //add post request to save experience and health
            navigate("/main")
        }
        else {
            rejection.play()
            console.log("You couldn't escape")
        }
    }

    /////////////////CAPTURE///////////////////////////////////////////////////////

    const capturePoke = async () => {
        let data = {
            "id": currentOpponent.id
        };

        pokeApi.defaults.headers.common[
            "Authorization"
        ] = `Token ${user.Token}`;

        try {
            let response = await pokeApi.post(`${currentOpponent.id}/`, data);
            console.log("capture poke post", response, currentOpponent.id);

            if (response.status === 201) {
                saveHealthXP() //add post request to save experience and health
                //change to navigate to victory screen
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
            if (pokeTeam.length < 6) {
                addToTeam()
                getTeam()
                navigate("/main");
            }
            else {
                navigate("/main");
            }
        }
        else if (currentOpponentHealth / currentOpponentHealthTotal < .3) {
            let captureChance = (Math.floor(Math.random() * (5 - 1 + 1)) + 1)
            if (captureChance < 4) {
                console.log("pokemon captured") //add post request
                capturePoke()
                //add to team if less than 6
                if (pokeTeam.length < 6) {
                    addToTeam()
                    getTeam()
                    navigate("/main");
                }
                else {
                    navigate("/main");
                }
            }
            else {
                console.log("pokemon capture failed")
                console.log("opponent attack")
                let counterAttack = (Math.floor(Math.random() * (10 - 0 + 1)))
                rejection.play()
                setCurrentPokemonHealth(currentPokemonHealth - counterAttack)

            }
        }
        else {
            let captureChance = (Math.floor(Math.random() * (10 - 1 + 1)) + 1)
            if (captureChance < 4) {
                console.log("pokemon captured") //add post request
                capturePoke()
                //add to team if less than 6
                if (pokeTeam.length < 6) {
                    addToTeam()
                    getTeam()
                    navigate("/main");
                }
                else {
                    navigate("/main");
                }
            }
            else {
                console.log("pokemon capture failed")
                console.log("opponent attack")
                rejection.play()
                let counterAttack = (Math.floor(Math.random() * (10 - 0 + 1)))
                setCurrentPokemonHealth(currentPokemonHealth - counterAttack)
            }
        }
    }

    const [selectedIds, setSelectedIds] = useState([]);

    const getPokemonId = () => {
        setSelectedIds([
            ...pokeTeam.map((pokemon) => pokemon.user_pokemon.pokemon.id),
            currentOpponent.id
        ]);
    };

    useEffect(() => {
        getPokemonId();
    }, [currentOpponent]);


    const addToTeam = async () => {
        console.log("attempting to add to team")
        let data = {
            'action': 'pick',
            'pokemon_ids': selectedIds
        }

        console.log("add to team data: ", data)

        teamApi.defaults.headers.common[
            "Authorization"
        ] = `Token ${user.Token}`;

        let addTeam = await teamApi.post("1/", data)
            .catch(error => {
                console.log("couldn't add pokemon")
                console.error(error);
            })

        console.log("add to team?", addTeam.status)
    }

    ////////////POKE DEATH////////////////////////////////////////////////////////////

    const handleDeath = async () => {
        setCurrentPokemonHealth(0)
        await saveHealthXP()
        openModal()
        //save health + exp
        // disable the option to use pokemon
        //ask user to pick or default pick the next
    }

    ////////////////TIMING////////////////////////////////////////////////////////////

    useEffect(() => {
        getRandomNum()
    }, [])

    useEffect(() => {
        getTeam()
        wildPoke()
    }, [randomNum])

    useEffect(() => {
        saveHealthXP()
    }, [currentPokemonHealth])

    useEffect(() => {
        if (currentOpponentHealth <= 0) {
            handleWin()
        }
        else if (currentPokemonHealth < 1) {
            let allPokeDead = pokeTeam.every((poke) => poke.user_pokemon.pokemon.hp === 0);
            if (allPokeDead) {
                navigate('/gameover')
            }
            else {
                console.log('handling death')
                handleDeath()
            }
        }
    }, [currentOpponentHealth, currentPokemonHealth, modalIsOpen])

    useEffect(() => {
        if (currentPokemonExperience >= 100) {
            setCurrentPokemonExperience(currentPokemonExperience - 100)
            setCurrentPokemonLevel(currentPokemonLevel + 1)
        }
    }, [exp])

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate('/landing')
        }
        else if (pokeTeam.length <= 0) {
            navigate('/house')
        }
    }, [])

    return (
        <div className='full_page_div'>
            {currentPokemon && currentOpponent ?
                (<div id='battle_div'>
                    <audio autoPlay src={battlemusic1} loop type="audio/wav" volume='0.2'></audio>
                    <div id='battle_options_div'>
                        <div id='moves_div'>
                            <button onClick={handleMove1} className='battle_buttons'>{currentPokemon.move_1}</button>
                            <button onClick={handleMove2} className='battle_buttons'>{currentPokemon.move_2}</button>
                        </div>
                        <div id='other_options_div'>
                            <button onClick={handleCapture} className='battle_buttons'>Capture</button>
                            <button onClick={openModal} className='battle_buttons'>Change Pokemon</button>
                            <button onClick={handleRun} className='battle_buttons'>Run</button>
                        </div>
                    </div>
                    <div id='poke_div'>
                        <div>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                contentLabel="Your Team"
                            >
                                <h2>Select a Pokemon:</h2>
                                {pokeTeam.map((poke) => (
                                    <button key={poke.user_pokemon.pokemon.id} className='battle_modal_buttons' onClick={() => handleOptionClick(poke.user_pokemon.pokemon)} disabled={poke.user_pokemon.pokemon.hp <= 0}>
                                        {poke.user_pokemon.pokemon.name} hp: {poke.user_pokemon.pokemon.hp} <img src={poke.user_pokemon.pokemon.front_img} />
                                    </button>
                                ))}
                                <button onClick={closeModal}>Close</button>
                            </Modal>
                        </div>
                        <div id='your_pokemon_div'>
                            <div id='your_pokemon_status_div'>
                                <h3>{currentPokemon.name}</h3>
                                <h4>Level: {currentPokemonLevel}</h4>
                                <div className='status_bar_div'>
                                    <ProgressBar max={currentPokemonHealthTotal} min={0} now={currentPokemonHealth} label={`${currentPokemonHealth}`} className='actual_status_bar' />
                                    <ProgressBar now={currentPokemonExperience} label={`${currentPokemonExperience}`} className='actual_status_bar' />
                                </div>
                                <img alt='poke' src={`${currentPokemon.back_img}`} className='pokemon_image' />
                            </div>
                        </div>
                        <div id='opponent_div'>
                            <div className='poke_profile'>
                                <h3>{currentOpponent.name}</h3>
                                <div className='status_bar_div'>
                                    <ProgressBar max={currentOpponentHealthTotal} min={0} now={currentOpponentHealth} label={`${currentOpponentHealth}`} className='actual_status_bar' />
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
export default BattlePage