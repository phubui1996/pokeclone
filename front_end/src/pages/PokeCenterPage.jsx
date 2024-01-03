import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { wildApi, pokeApi, teamApi } from '../components/utilities';

const PokeCenterPage = () => {
    const { pokeTeam, setPokeTeam, user } = useOutletContext()
    const [currentPokemonHealth, setCurrentPokemonHealth] = useState(50)
    const [currentPokemonHealthTotal, setCurrentPokemonHealthTotal] = useState(50)
    const [currentOpponentHealth, setCurrentOpponentHealth] = useState(50)
    const [currentOpponentHealthTotal, setCurrentOpponentHealthTotal] = useState(50)
    const [currentPokemon, setCurrentPokemon] = useState([])

    
    const getTeam = async () => {
        console.log("getting team")
        try {
            
            teamApi.defaults.headers.common[
                "Authorization"
            ] = `Token ${user.Token}`;
            
            let response = await teamApi.get('manager/');
            console.log("get team", response.data);
            
            if (response.status === 200) {
                setPokeTeam(response.data)
                console.log('the team', response.data[0].pokemons[0].user_pokemon.pokemon)
                setCurrentPokemon(response.data[0].pokemons[0].user_pokemon.pokemon)
            } else {
                alert("Error retrieving team");
            }
        } catch (error) {
            console.error("Error retrieving team:", error);
        }
    };
    
    
    useEffect(() => {
        getTeam()
    }, [])


    console.log(currentPokemon)
    console.log(pokeTeam)

    return (
        <div className="full_page_div">

        </div>
    )
}

export default PokeCenterPage;