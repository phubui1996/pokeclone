import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import main_map_music from '/src/assets/BackgroundMusic/PitcherPerfectTheme_Loopable.wav';
import grasstile from '/src/assets/MapTiles/GrassTile.png';
import flowertile1 from '/src/assets/MapTiles/FlowerTile1.png';
import flowertile2 from '/src/assets/MapTiles/FlowerTile2.png';
import clifftile from '/src/assets/MapTiles/CliffTile.png';
import watertile from '/src/assets/MapTiles/WaterTile.png';
import pokedex from '/src/assets/MapTiles/Pokedex-PNG-Photos.png';


export default function MainMapPage() {
    const tileMap = [grasstile, grasstile, grasstile, grasstile, grasstile, grasstile,
                    grasstile, grasstile, grasstile, grasstile, grasstile, grasstile,
                    grasstile, grasstile, grasstile, grasstile, grasstile, grasstile,
                    grasstile, grasstile, grasstile, grasstile, grasstile, grasstile,
                    grasstile, grasstile, grasstile, grasstile, grasstile, grasstile,
                    grasstile, grasstile, grasstile, grasstile, grasstile, grasstile,
                    clifftile, clifftile, clifftile, clifftile, clifftile, clifftile,
                    watertile, watertile, watertile, watertile, watertile, watertile]

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
                {tileMap.map((tile, index) => (
                    <img key={index} className='tile_map_div' src={`${tile}`}/>
                ))}
                <audio autoPlay src={main_map_music} loop type="audio/wav" volume='0.2'></audio>
                <div id='overall_map'>
                    <div id='upper_div'>
                        <div id='map_house_div' className='hover_div_map' onClick={handleHouse}>
                            <span class="hover_text_map">Change Pokemon</span>
                        </div>
                        <div id='poke_center_div' className='hover_div_map' onClick={handlePokeCenter}>
                            <span class="hover_text_map">Heal Pokemon</span>
                        </div>
                    </div>
                    <div id='main_area_div'>
                        <div className='tall_grass_div' onClick={handleTallGrass}>
                            <span class="hover_text_map">Battle Pokemon</span>
                        </div>
                        <div id='gym_div' className='hover_div_map' onClick={handleGym}>
                            <span class="hover_text_map">Battle Gym Leader</span>
                        </div>
                        <div className='tall_grass_div'  onClick={handleTallGrass}>
                            <span class="hover_text_map">Battle Pokemon</span>
                        </div>
                    </div>
                    <div id='bottom_div'>
                        <div id='main_pokedex_div' className='hover_div_map'>
                            <img id='main_pokedex_img' onClick={handlePokedex} src={pokedex} />
                            <span className="hover_text_map">Pokedex</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}