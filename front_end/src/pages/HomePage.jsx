import { Link, useNavigate, useOutletContext } from "react-router-dom"
import { useEffect, useState } from 'react'
import { pokeApi, teamApi, pokedexApi } from "../components/utilities"
import pokeLogo from '../assets/PokeLogoClean.png'


export default function HomePage() {
    const { isLoggedIn, setIsLoggedIn, pokeTeam, setPokeTeam, pokedex, setPokedex } = useOutletContext()

    const navigate = useNavigate()

    const getTeam = async () => {
        try {
            let response = await teamApi.get('manager/');
            console.log("get team", response.data);

            if (response.status === 200) {
                setPokeTeam(response.data)
            } else {
                alert("Error retrieving team");
            }
        } catch (error) {
            console.error("Error retrieving team:", error);
        }
    };


    // const deleteTeam = async () => {
    //     let data = {
    //         'action': 'unpick',
    //         'pokemon_ids': []
    //     }
    //     try {
    //         let response = await teamApi.post('1/', data);
    //         console.log("get team", response.data);

    //         if (response.status === 204) {
    //             getTeam()
    //         } else {
    //             alert("Error deleting team");
    //         }
    //     } catch (error) {
    //         console.error("Error deleting team:", error);
    //     }
    // };

    const getPokedex = async () => {
        try {
            let response = await pokedexApi.get('');
            console.log("pokedex post", response.data);

            if (response.status === 200) {
                setPokedex(response.data)
            } else {
                alert("Error retrieving pokedex");
            }
        } catch (error) {
            console.error("Error retrieving pokedex:", error);
        }
    };

    const deletePokedex = async () => {
        try {
            let response = await pokedexApi.delete('');
            console.log("pokedex delete intiated");

            if (response.status === 204) {
                console.log("pokedex deleted")
                getPokedex()
            } else {
                alert("Pokedex not deleted");
            }
        } catch (error) {
            console.error("Error deleting pokedex:", error);
        }
    };

    const handleNewGame = () => {
        if (pokedex.length < 1) {
            deletePokedex()
            // deleteTeam()
            console.log("current team", pokeTeam)
            navigate('/starter')
        }
        else {
            navigate('/starter')
        }
    }

    const handleContinueGame = () => {
        navigate('/main')
    }

    useEffect(() => {
        getPokedex()
        getTeam()
        if (isLoggedIn === false) {
            navigate('/landing')
        }
    }, [])

    return (
        <div className="full_page_div">
            <div id="home_page_div">
                <img src={pokeLogo} id='landing_logo' />
                <button onClick={handleNewGame} className='home_buttons'>New Game</button>
                <button onClick={handleContinueGame} className='home_buttons'>Continue</button>
            </div>
        </div>
    )
}