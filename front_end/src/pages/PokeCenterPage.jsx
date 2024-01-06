import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { wildApi, pokeApi, teamApi } from '../components/utilities';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Sound from 'react-audio-player';
import pokeCenterPageMusic from '/src/assets/BackgroundMusic/low-bass-loop.wav'


const PokeCenterPage = () => {
    const { pokeTeam, setPokeTeam, user, isLoggedIn } = useOutletContext()
    // const [currentPokemon, setCurrentPokemon] = useState([])
    const [currentPokemonHealth, setCurrentPokemonHealth] = useState(50)
    const [currentPokemonHealthTotal, setCurrentPokemonHealthTotal] = useState(50)
    const [selectedIds, setSelectedIds] = useState([]);

    const navigate = useNavigate()
    

    const getPokeTeam = async () => {
        try {
          const response = await teamApi.get("manager/");
          setPokeTeam(response.data[0].pokemons);
          console.log(pokeTeam)
        } catch (error) {
          console.error("Error fetching data from team pokemon", error);
        }
      };
    


    const getPokemonId = () => {
    setSelectedIds(
        pokeTeam.map((pokemon) => {
            // console.log(pokmon.user_pokemon.id)
        // return pokemon.user_pokemon.pokemon.id;
        return pokemon.id
        })
    )}

console.log(selectedIds)

    const healPokemon = () => {
        
        console.log("healing team pokemon")

        
        
        async function updatePokemonTeam(pokeTeam) {
            try {
                const promises = pokeTeam.map(async (pokemon) => {
                    console.log("pokemon", pokemon)
                    console.log("before", pokemon.user_pokemon.pokemon)
                    let data = {
                        "name": pokemon.user_pokemon.pokemon.name,
                        "type": pokemon.user_pokemon.pokemon.type,
                        "move_1": pokemon.user_pokemon.pokemon.move_1,
                        "move_2": pokemon.user_pokemon.pokemon.move_2,
                        "front_img": pokemon.user_pokemon.pokemon.front_img,
                        "back_img": pokemon.user_pokemon.pokemon.back_img,
                        "pokemon_id": pokemon.user_pokemon.pokemon.pokemon_id,
                        'base_hp': pokemon.user_pokemon.pokemon.base_hp,
                        'hp': pokemon.user_pokemon.pokemon.base_hp,
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
        
        getPokeTeam()  
    }
    
    
    useEffect(() => {
        getPokeTeam()
    }, [])

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate('/landing')
        }
    }, [])
    
    // console.log(user)
    console.log(currentPokemonHealthTotal)
    console.log(pokeTeam)
    
    return (
        <div className="full_page_div">
            <audio autoPlay src={pokeCenterPageMusic} loop type="audio/wav" volume='0.2'></audio>
            <div className='pokecenter'>
                <ListGroup >
                    <div className='pokecenter_buttons_div'>
                        <Button className='pokecenter_buttons' onClick={healPokemon}>Heal Pokemon</Button>
                        <Button className='pokecenter_buttons' onClick={() => navigate("/main")}>Exit</Button>
                    </div>
                    <div className='pokecenter_team'>
                        {pokeTeam.map((pokemon) => (
                            <>
                                <ListGroup.Item variant='danger' className='more_buttons'>{pokemon.user_pokemon.pokemon.name}</ListGroup.Item>
                                <ProgressBar className='pokecenter_progress' max={pokemon.user_pokemon.pokemon.base_hp} now={pokemon.user_pokemon.pokemon.hp} label={`${pokemon.user_pokemon.pokemon.hp}`} />
                            </> 
                        ))}
                    </div>
                </ListGroup>
            </div>
        </div>
    )
}

export default PokeCenterPage;