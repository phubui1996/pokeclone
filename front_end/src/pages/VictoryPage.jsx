import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Button from "react-bootstrap/esm/Button"
import Sound from 'react-audio-player';
import victoryPageMusic from '/src/assets/BackgroundMusic/victorypage-music.wav'
import { wildApi, pokeApi, teamApi } from '../components/utilities';
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';

const VictoryPage = () => {
    const [randomNum, setRandomNum] = useState(5)
    
    const { pokeTeam, setPokeTeam, user, isLoggedIn } = useOutletContext()

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/main')
    }

    function getRandomNum() {
        setRandomNum(Math.floor(Math.random() * (30 - 1 + 1)) + 1) //random number between 1 and 30
        console.log(randomNum)
    }

    const getTeam = async () => {
        console.log("getting team")

            teamApi.defaults.headers.common[
                "Authorization"
            ] = `Token ${user.Token}`;

            let response = await teamApi.get('manager/');

            if (response.status === 200) {
                setPokeTeam(response.data[0].pokemons)
                console.log('the team down here', pokeTeam)
                for (let i = 0; i < response.data[0].pokemons.length; i++) {
                    let pokemon = response.data[0].pokemons[i].user_pokemon.pokemon;
                    console.log("pokemon", pokemon)
                
            }
        }
    }
    
    const levelUpPokemon = () => {

        console.log("leveling-up team pokemon")



        async function updatePokemonTeam(pokeTeam) {
            try {
                const promises = pokeTeam.map(async (pokemon) => {
                    console.log("pokemon", pokemon);
                    console.log("before", pokemon.user_pokemon.pokemon);

                    // Check if the Pokemon has more than zero HP
                    if (pokemon.user_pokemon.pokemon.hp > 0) {
                        // Update XP
                        pokemon.user_pokemon.pokemon.xp += randomNum

                        // Check if XP reaches 100 or more for leveling up
                        while (pokemon.user_pokemon.pokemon.xp >= 100) {
                            pokemon.user_pokemon.pokemon.xp -= 100; // Subtract 100 from XP
                            pokemon.user_pokemon.pokemon.lvl += 1; // Level up
                        }
                    }

                    let data = {
                        "name": pokemon.user_pokemon.pokemon.name,
                        "type": pokemon.user_pokemon.pokemon.type,
                        "move_1": pokemon.user_pokemon.pokemon.move_1,
                        "move_2": pokemon.user_pokemon.pokemon.move_2,
                        "front_img": pokemon.user_pokemon.pokemon.front_img,
                        "back_img": pokemon.user_pokemon.pokemon.back_img,
                        "pokemon_id": pokemon.user_pokemon.pokemon.pokemon_id,
                        'base_hp': pokemon.user_pokemon.pokemon.base_hp,
                        'hp': pokemon.user_pokemon.pokemon.hp,
                        'xp': pokemon.user_pokemon.pokemon.xp,
                        'lvl': pokemon.user_pokemon.pokemon.lvl,
                    }

                    const storedToken = localStorage.getItem("token");
                    console.log("token", storedToken)

                    pokeApi.defaults.headers.common["Authorization"] = `Token ${storedToken}`;
                    const response = await pokeApi.put(`${pokemon.user_pokemon.pokemon.id}/`, data);

                    console.log("After", pokemon.user_pokemon.pokemon)
                    console.log(response.data, "Your Pokémon is at full health!");
                });

                // Wait for all promises to resolve before moving on
                await Promise.all(promises);

                // Once all requests are completed, call getTeam
                // getTeam();
            } catch (error) {
                console.error("Error updating Pokémon team:", error);
            }
        }
        updatePokemonTeam(pokeTeam);

        getTeam()
    }


    const addXP = () => {
        pokeTeam.map((pokemon) =>{
            console.log(pokemon.user_pokemon.pokemon.xp)

        })
    }

        addXP()

        useEffect(() => {
            getRandomNum()
            levelUpPokemon()
            getTeam()
        }, [])
   
        // getPokeStats = async () => {
    
        //     pokeApi.defaults.headers.common[
        //         "Authorization"
        //     ] = `Token ${user.Token}`;
    
        //     let response = await pokeApi.get(`${currentPokemon.id}/`); //updates pokemon stats
        // }

        

console.log(pokeTeam)

    return(
        <div className='full_page_div' onClick={handleClick}>
            <div className="victory">
                <div>
                    <h1>VictoryVictory</h1><h1>Victory</h1><h1>VictoryVictory</h1>
                    <img src="https://media4.giphy.com/media/IQebREsGFRXmo/200w.gif?cid=6c09b952jb3gk3kmsx3c47an338tqhgysg53uam89h4z3h6m&ep=v1_gifs_search&rid=200w.gif&ct=s"/>
                    <h1>Victory</h1><h1>VictoryVictory</h1><h1>Victory</h1>
                </div>
            </div>
            <div>
                <ListGroup className='victory_team'>
                    victory Team
                    {pokeTeam.map((pokemon) => (
                            <>
                                <ListGroup.Item variant='danger' className='more_buttons'>{pokemon.user_pokemon.pokemon.name} Lvl {pokemon.user_pokemon.pokemon.lvl}</ListGroup.Item>
                                <ProgressBar className='pokecenter_progress' max={pokemon.user_pokemon.pokemon.base_hp}
                                                                             now={pokemon.user_pokemon.pokemon.hp}
                                                                             label={`hp: ${pokemon.user_pokemon.pokemon.hp}`} />
                                <ProgressBar max={100} now={pokemon.user_pokemon.pokemon.xp}label={`xp: ${pokemon.user_pokemon.pokemon.xp}`}/>
                            </> 
                        ))}
                </ListGroup>
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

