import { useOutletContext } from "react-router-dom";

const IntroPage = () => {
    const { pokeTeam } = useOutletContext()

    console.log(pokeTeam)
    
    return (
        <div className="full_page_div">

        </div>
    )
}

export default IntroPage;