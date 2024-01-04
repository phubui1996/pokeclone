import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { wildApi, pokeApi, teamApi } from '../components/utilities';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

const PokeCenterPage = () => {
    const { pokeTeam, setPokeTeam, user } = useOutletContext()
    // const [currentPokemon, setCurrentPokemon] = useState([])
    const [currentPokemonHealth, setCurrentPokemonHealth] = useState(50)
    const [currentPokemonHealthTotal, setCurrentPokemonHealthTotal] = useState(50)
    const [selectedIds, setSelectedIds] = useState([]);

    const navigate = useNavigate()
    
    // const getTeam = async () => {
    //     console.log("getting team")
    //     try {
            
    //         teamApi.defaults.headers.common[
    //             "Authorization"
    //         ] = `Token ${user.Token}`;
            
    //         let response = await teamApi.get('manager/');
    //         console.log("get team", response.data);
            
    //         if (response.status === 200) {
    //             console.log(response.data)
    //             setPokeTeam(response.data)
    //             console.log('the team', response.data[0].pokemons[0].user_pokemon.pokemon)
    //             setCurrentPokemon(response.data[0].pokemons[0].user_pokemon.pokemon)
    //         } else {
    //             alert("Error retrieving team");
    //         }
    //     } catch (error) {
    //         console.error("Error retrieving team:", error);
    //     }
    // };

    const getPokeTeam = async () => {
        try {
          const response = await teamApi.get("manager/");
          setPokeTeam(response.data[0].pokemons);
          console.log(pokeTeam)
        } catch (error) {
          console.error("Error fetching data from team pokemon", error);
        }
      };
    
    //   const getCapturedPokemons = async () => {
    //     try {
    //       const response = await pokeApi.get("");
    //       setCapturePokemons(response.data);
    //     } catch (error) {
    //       console.error("Error fetching data from capture pokemon", error);
    //     }
    //   };
    
      const fetchData = async () => {
        try {
          const storedToken = localStorage.getItem("token");
    
          if (storedToken) {
            // Set Authorization header for teamApi
            teamApi.defaults.headers.common[
              "Authorization"
            ] = `Token ${storedToken}`;
            pokeApi.defaults.headers.common[
              "Authorization"
            ] = `Token ${storedToken}`;
    
            await Promise.all([getPokeTeam(), getCapturedPokemons()]);
          } else {
            console.log("Token not found in local storage");
          }
        } catch (error) {
          console.error(error);
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
                    let data = {
                        'pokemon_id': pokemon.id,
                        // 'hp': pokemonHealthTotal,
                        'hp': pokemon.base_hp,
                        'xp': pokemon.xp,
                        'lvl': pokemon.lvl,
                        "name": pokemon.name,
                        "type": pokemon.type,
                        "move_1": pokemon.move_1,
                        "move_2": pokemon.move_2,
                        "front_img": pokemon.front_img,
                        
                        "back_img": pokemon.back_img,
                    }
                    const storedToken = localStorage.getItem("token");
                    console.log("token", storedToken)
                    
                    pokeApi.defaults.headers.common["Authorization"] = `Token ${storedToken}`;
                    const response = await pokeApi.put(`${pokemon.id}/`, data);
                    console.log(response.data, "Your Pokémon is at full health!");
                });
        
                // Wait for all promises to resolve before moving on
                await Promise.all(promises);
        
                // Once all requests are completed, call getTeam
                getTeam();
            } catch (error) {
                console.error("Error updating Pokémon team:", error);
            }
        }
        
        // Example usage
        // const myPokeTeam = [1, 2, 3]; // Replace with actual Pokémon IDs
        // const myUser = { Token: "your_token_here" }; // Replace with actual user token
        // const myData = { /* Your update data */ };
        
        updatePokemonTeam(pokeTeam);
        
    //     pokeTeam.map(async(pokemon)=> {
            
    //         pokeApi.defaults.headers.common[
    //             "Authorization"
    //         ] = `Token ${user.Token}`;

    //         let response = await pokeApi.put(`${currentPokemon}/`, data)
    //         console.log(response.data, ", your pokemon are at full health!") 
    //     })
    //     getTeam()  
    }
    

    useEffect(() => {
        getPokeTeam()
        // getPokemonId()
    }, [])
    
    // console.log(user)
    console.log(currentPokemonHealthTotal)
    console.log(pokeTeam)
    // // console.log(pokeTeam[0].user_pokemon.pokemon)
    // console.log(pokeTeam[0].user_pokemon.pokemon.name)
    // console.log(pokeTeam[1].user_pokemon.pokemon.name)


    return (
        <div className="full_page_div">
            <div className='pokecenter'>
                <ListGroup >
                    <div className='pokecenter_buttons'>
                        <Button onClick={healPokemon}>Heal Pokemon</Button>
                        <Button onClick={() => navigate("/main")}>Exit</Button>
                    </div>
                    <div className='pokecenter_team'>
                        {pokeTeam.map((pokemon) => (
                            <>
                            <ListGroup.Item variant='danger' className='more_buttons'>{pokemon.user_pokemon.pokemon.name}</ListGroup.Item>
                            <ProgressBar max={currentPokemonHealthTotal} now={pokemon.user_pokemon.pokemon.hp} label={`${pokemon.user_pokemon.pokemon.hp}`} className='actual_status_bar' />
                            </>
                            // <ListGroup.Item variant="danger">{pokemon.name}</ListGroup.Item>    
                        ))}
                        {/* <ListGroup.Item variant="danger">{pokeTeam[0].user_pokemon.pokemon.name}</ListGroup.Item> */}
                        {/* <ProgressBar max={currentPokemonHealthTotal} now={pokeTeam[0].pokemons[0].user_pokemon.pokemon.hp} label={`${pokeTeam[0].pokemons[0].user_pokemon.pokemon.hp}`} className='actual_status_bar' /> */}
                        {/* <ListGroup.Item variant="secondary"></ListGroup.Item>
                        <ListGroup.Item variant="success"></ListGroup.Item>
                        <ListGroup.Item variant="danger"></ListGroup.Item>
                        <ListGroup.Item variant="warning"></ListGroup.Item>
                        <ListGroup.Item variant="info"></ListGroup.Item>
                        <ListGroup.Item variant="light"></ListGroup.Item>
                        <ListGroup.Item variant="dark"></ListGroup.Item> */}
                    </div>
                </ListGroup>
            </div>
        </div>
    )
}

export default PokeCenterPage;