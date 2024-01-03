import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { wildApi, pokeApi, teamApi } from '../components/utilities';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const PokeCenterPage = () => {
    const { pokeTeam, setPokeTeam, user } = useOutletContext()
    const [currentPokemonHealth, setCurrentPokemonHealth] = useState(50)
    const [currentPokemonHealthTotal, setCurrentPokemonHealthTotal] = useState(50)
    const [currentOpponentHealth, setCurrentOpponentHealth] = useState(50)
    const [currentOpponentHealthTotal, setCurrentOpponentHealthTotal] = useState(50)
    const [currentPokemon, setCurrentPokemon] = useState([])

    
    // const getTeam = async () => {
    //     console.log("getting team")
    //     try {
            
    //         teamApi.defaults.headers.common[
    //             "Authorization"
    //         ] = `Token ${user.Token}`;
            
    //         let response = await teamApi.get('manager/');
    //         console.log("get team", response.data);
            
    //         if (response.status === 200) {
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
    
    
    // useEffect(() => {
    //     // getTeam()
    // }, [])


    // console.log(currentPokemon)
    console.log(pokeTeam)
    // console.log(pokeTeam[0].pokemons[0].user_pokemon.pokemon.name)


    return (
        <div className="full_page_div">
                <div className='pokecenter'>
            <ListGroup className='pokecenter_team'>
                    <Button className='pokecenter_buttons'>Heal Pokemon</Button>
                    <Button className='pokecenter_buttons'>Exit</Button>
                    <ListGroup.Item variant="primary">{pokeTeam[0].pokemons[0].user_pokemon.pokemon.name}</ListGroup.Item>
                    {/* <ListGroup.Item variant="primary">{pokeTeam[0][pokemons][0].user_pokemon.pokemon.name}</ListGroup.Item> */}
                    {/* <ListGroup.Item variant="secondary">Secondary</ListGroup.Item>
                    <ListGroup.Item variant="success">Success</ListGroup.Item> */}
                    {/* <ListGroup.Item variant="danger">Danger</ListGroup.Item>
                    <ListGroup.Item variant="warning">Warning</ListGroup.Item>
                    <ListGroup.Item variant="info">Info</ListGroup.Item>
                    <ListGroup.Item variant="light">Light</ListGroup.Item>
                    <ListGroup.Item variant="dark">Dark</ListGroup.Item> */}
            </ListGroup>
                </div>
        </div>
    )
}

export default PokeCenterPage;