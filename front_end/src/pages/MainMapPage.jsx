

export default function MainMapPage() {

    const handleHouse = () => {
        console.log("We didn't build this yet")
    }

    const handlePokeCenter = () => {
        console.log("We didn't build this yet")
    }

    const handleGym = () => {
        console.log("We didn't build this yet")
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

    return (
        <div className='full_page_div'>
            <div id='main_map_div'>
                <div id='overall_map'>
                    <div id='upper_div'>
                        <div id='house_div' onClick={handleHouse}>
                            <img src='' alt='house'/>
                        </div>
                        <div id='poke_center_div' onClick={handlePokeCenter}>
                            <img src='' alt='poke center'/>
                        </div>
                    </div>
                    <div id='main_area_div'>
                        <div className='tall_grass_div' onClick={handleTallGrass}>
                            <img src='' alt='tall grass'/>
                        </div>
                        <div id='gym_div' onClick={handleGym}>
                            <img src='' alt='gym'/>
                        </div>
                        <div className='tall_grass_div' onClick={handleTallGrass}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}