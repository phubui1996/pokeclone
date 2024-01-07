import { wildApi, teamApi, pokeApi } from '../components/utilities';
import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Sound from 'react-audio-player';
import starterPageMusic from '/src/assets/BackgroundMusic/cowbells-in-the-alps.wav'


const StarterPage = () => {
    const [starter1, setStarter1] = useState([])
    const [starter2, setStarter2] = useState([])
    const [starter3, setStarter3] = useState([])
    const [choice, setChoice] = useState([])

    const { isLoggedIn, setIsLoggedIn, user, pokeTeam, setPokeTeam } = useOutletContext()

    const navigate = useNavigate()

    const getStarters = async () => {
        let response1 = await wildApi.get(`1`)
        let response2 = await wildApi.get(`4`)
        let response3 = await wildApi.get(`7`)
        //console.log(response1.data)
        setStarter1(response1.data)
        setStarter2(response2.data)
        setStarter3(response3.data)
    }

    //console.log("The team so far",pokeTeam)

    const handleStarter1 = () => {
        
        setChoice(starter1)
    }

    const handleStarter2 = () => {
        setChoice(starter2)
    }

    const handleStarter3 = async () => {
        setChoice(starter3)
    }

    const addToTeam = async () => {
        //console.log("we did get this far")
        let data = {
            'action': 'pick',
            'pokemon_ids': [choice.id]
        }

        console.log("add to team data: ",data)

        pokeApi.defaults.headers.common[
            "Authorization"
        ] = `Token ${user.Token}`;

        teamApi.defaults.headers.common[
            "Authorization"
        ] = `Token ${user.Token}`;


        let capture = await pokeApi.post(`${choice.id}/`)
        console.log(capture.data, capture.status)


        let addTeam = await teamApi.post(`1/`, data)
            .then(addTeam => {
                console.log(addTeam);
                console.log("pokemon added to team")
                getTeam()
            })
            .catch(error => {
                console.log("couldn't add pokemon")
                console.error(error);
            })
        console.log(addTeam.status)
    }

    const getTeam = async () => {
        console.log("getting team")
        try {

            teamApi.defaults.headers.common[
                "Authorization"
            ] = `Token ${user.Token}`;

            let response = await teamApi.get('manager/');
            console.log("get team", response.data[0].pokemons);

            if (response.status === 200) {
                setPokeTeam(response.data[0].pokemons)
                navigate('/intro')
            } else {
                alert("Error retrieving team");
            }
        } catch (error) {
            console.error("Error retrieving team:", error);
        }
    };

    useEffect(() => {
        getStarters()
        if (isLoggedIn === false) {
            navigate('/landing')
        }
    }, [])

    useEffect(() => {
        console.log("poke choice", choice.name, choice.id)
        addToTeam()
    }, [choice])



    return (
        <div className="full_page_div">
            <audio autoPlay src={starterPageMusic} loop type="audio/wav" volume='0.2'></audio>
            <div id='starter_div'>
                <div id='starter_message_div'>
                    <h1 id='starter_message'>Choose your first pokemon:</h1>
                </div>
                {starter1 && starter2 && starter3 ? (<div id='all_starter_poke'>
                    <div id='starter_poke1'>
                        <img src={`${starter1.front_img}`} className='starter_imgs' onClick={handleStarter1} />
                    </div>
                    <div id='starter_poke2'>
                        <img src={`${starter2.front_img}`} className='starter_imgs' onClick={handleStarter2} />
                    </div>
                    <div id='starter_poke3'>
                        <img src={`${starter3.front_img}`} className='starter_imgs' onClick={handleStarter3} />
                    </div>
                </div>) : (<h3>loading...</h3>)}
            </div>
        </div>
    )
}

export default StarterPage;
