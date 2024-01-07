import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Button from "react-bootstrap/esm/Button"
import Sound from 'react-audio-player';
import victoryPageMusic from '/src/assets/BackgroundMusic/victorypage-music.wav'
import { wildApi, pokeApi, teamApi } from '../components/utilities';
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';

const VictoryPage = () => {
    
    const { pokeTeam, setPokeTeam, user, isLoggedIn } = useOutletContext()

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/main')
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

    useEffect(() => {
        getTeam()
}, [])

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
                                <ListGroup.Item variant='danger' className='more_buttons'>{pokemon.user_pokemon.pokemon.name}</ListGroup.Item>
                                <ProgressBar className='pokecenter_progress' max={pokemon.user_pokemon.pokemon.base_hp} now={pokemon.user_pokemon.pokemon.hp} label={`${pokemon.user_pokemon.pokemon.hp}`} />
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

