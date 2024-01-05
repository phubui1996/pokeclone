import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import main_map_music from '/src/assets/BackgroundMusic/PitcherPerfectTheme_Loopable.wav';

export default function MainMapPage() {
    const { isLoggedIn } = useOutletContext()

    const navigate = useNavigate()

    const handleHouse = () => {
        navigate("/house")
    }

    const handlePokeCenter = () => {
        navigate("/pokecenter")
    }

    const handleGym = () => {
        navigate("/gym")
    }

    const handleTallGrass = () => {
        let attack = (Math.floor(Math.random() * (5 - 0 + 1)))
        if (attack > 2) {
            console.log("FIGHT")
            navigate("/battle")
        }
        else {
            console.log("No pokemon here!")
        }
    }

    const handlePokedex = () => {
        navigate("/pokedex")
    }

    useEffect (() => {
        if (isLoggedIn === false){
            navigate('/landing')
        }
    }, [])

    return (
        <div className='full_page_div'>
            <div id='main_map_div'>
                <audio autoPlay src={main_map_music} loop type="audio/wav" volume='0.2'></audio>
                <div id='overall_map'>
                    <div id='upper_div'>
                        <div id='map_house_div' onClick={handleHouse}>
                            <img src='' />
                        </div>
                        <div id='poke_center_div' onClick={handlePokeCenter}>
                            <img src='' />
                        </div>
                    </div>
                    <div id='main_area_div'>
                        <div className='tall_grass_div' onClick={handleTallGrass}>
                            <img src='' />
                        </div>
                        <div id='gym_div' onClick={handleGym}>
                            <img src='' />
                        </div>
                        <div className='tall_grass_div' onClick={handleTallGrass}>
                            <img src='' />
                        </div>
                    </div>
                    <div id='bottom_div'>
                        <div id='main_pokedex_div'>
                            <img id='main_pokedex_img'onClick={handlePokedex} src='https://imgs.search.brave.com/EIbEJpMXzF_hA9WLlUyE8Cnw2Y2h-RJKS_SX_FTU4PY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9waXhl/bGFydG1ha2VyLWRh/dGEtNzg3NDYyOTEx/OTMubnljMy5kaWdp/dGFsb2NlYW5zcGFj/ZXMuY29tL2ltYWdl/L2ZkN2E4N2JiODM5/NDc5NS5wbmc' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}