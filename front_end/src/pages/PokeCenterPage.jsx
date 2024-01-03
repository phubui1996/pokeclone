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

    const navigate = useNavigate()
    
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

    const healPokemon = async() => {
        
        let currentPokemon = pokeTeam[0].pokemons[0].user_pokemon.pokemon
        
        let pokeID = pokeTeam[0].pokemons[0].user_pokemon.pokemon.id
        console.log(`pokeID: ${pokeID}`)
        console.log("healing team pokemon")
        console.log(currentPokemon)
        pokeApi.defaults.headers.common[
            "Authorization"
        ] = `Token ${user.Token}`;
        
        
        let data = {
            'pokemon_id': currentPokemon.id,
            // 'hp': currentPokemonHealthTotal,
            'hp': 50,
            'xp': currentPokemon.xp,
            'lvl': currentPokemon.lvl,
            "name": currentPokemon.name,
            "type": currentPokemon.type,
            "move_1": currentPokemon.move_1,
            "move_2": currentPokemon.move_2,
            "front_img": currentPokemon.front_img,
            "back_img": currentPokemon.back_img,
        }
        let response = await pokeApi.put(`${pokeID}/`, data)
        console.log(response.data, ", your pokemon are at full health!")   
    }


    useEffect(() => {
        // getTeam()
        healPokemon()
    }, [currentPokemonHealthTotal])

    console.log(user)
    console.log(currentPokemonHealthTotal)
    console.log(pokeTeam[0].pokemons[0].user_pokemon)
    // console.log(pokeTeam[0].pokemons[0].user_pokemon.pokemon.hp)

    return (
        <div className="full_page_div">
            <div className='pokecenter'>
                <ListGroup >
                    <div className='pokecenter_buttons'>
                        <Button onClick={healPokemon}>Heal Pokemon</Button>
                        <Button onClick={() => navigate("/main")}>Exit</Button>
                    </div>
                    <div className='pokecenter_team'>
                        <ListGroup.Item variant="danger">{pokeTeam[0].pokemons[0].user_pokemon.pokemon.name}</ListGroup.Item>
                        <ProgressBar max={currentPokemonHealthTotal} now={pokeTeam[0].pokemons[0].user_pokemon.pokemon.hp} label={`${pokeTeam[0].pokemons[0].user_pokemon.pokemon.hp}`} className='actual_status_bar' />
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