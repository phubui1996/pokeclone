import { wildApi, pokeApi, teamApi } from '../components/utilities';
import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

const StarterPage = () => {
    const [starter1, setStarter1] = useState([])
    const [starter2, setStarter2] = useState([])
    const [starter3, setStarter3] = useState([])
    const [choice, setChoice] = useState([])

    const {isLoggedIn, setIsLoggedIn} = useOutletContext()

    const navigate = useNavigate()

    const getStarters = async () => {
        let response1 = await wildApi.get(`1`)
        let response2 = await wildApi.get(`4`)
        let response3 = await wildApi.get(`7`)
        console.log(response1.data)
        setStarter1(response1.data)
        setStarter2(response2.data)
        setStarter3(response3.data)
    }

    const handleStarter1 = () => {
        setChoice(starter1)
        
    }

    const handleStarter2 = () => {
        setChoice(starter2)
    }

    const handleStarter3 = async () => {
        //let response = await teamApi.get(`/pick/7`)
        setChoice(starter3)
    }

    useEffect(() => {
        getStarters()
        if (isLoggedIn === false) {
            navigate('/landing')
        }
    }, [])

    useEffect(() => {
        console.log(choice.name)
    }, [choice])

  

    return (
        <div className="full_page_div">
            <div id='starter_div'>
                <div id='starter_message_div'>
                    <h1 id='starter_message'>Choose your first pokemon:</h1>
                </div>
                <div id='all_starter_poke'>
                    <div id='starter_poke1'>
                        <img src={`${starter1.front_img}`} className='starter_imgs' onClick={handleStarter1} />
                    </div>
                    <div id='starter_poke2'>
                        <img src={`${starter2.front_img}`} className='starter_imgs' onClick={handleStarter2} />
                    </div>
                    <div id='starter_poke3'>
                        <img src={`${starter3.front_img}`} className='starter_imgs' onClick={handleStarter3} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StarterPage;