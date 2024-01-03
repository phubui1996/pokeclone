import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { teamApi, pokeApi } from "../components/utilities";
import TeamPokemonCard from "../components/TeamPokemonCard";

// path: "house/",

const HousePage = () => {
  const [teamPokemons, setTeamPokemons] = useState([]);
  const [capturedPokemons, setCapturePokemons] = useState([]);

  const getTeamPokemons = async () => {
    try {
      const response = await teamApi.get("manager/");
      setTeamPokemons(response.data[0].pokemons);
    } catch (error) {
      console.error("Error fetching data from team pokemon", error);
    }
  };

  const getCapturedPokemons = async () => {
    try {
      const response = await pokeApi.get("");
      console.log(response.data);
      setCapturePokemons(response.data);
    } catch (error) {
      console.error("Error fetching data from capture pokemon", error);
    }
  };

  useEffect(() => {
    // Retrieve token from local storage
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      // Set Authorization header for teamApi
      teamApi.defaults.headers.common["Authorization"] = `Token ${storedToken}`;
      pokeApi.defaults.headers.common["Authorization"] = `Token ${storedToken}`;

      // Fetch teamPokemons using the updated headers
      getTeamPokemons();
      getCapturedPokemons();
    } else {
      // Handle case where token is not available
      console.log("Token not found in local storage");
    }
  }, []);

  return (
    <>
      <div className="team_pokemons_div">
        <h2>Team Pokemon</h2>
        {teamPokemons.map((pokemon) => (
          <TeamPokemonCard
            key={pokemon.user_pokemon.pokemon.id}
            id={pokemon.user_pokemon.pokemon.id}
            name={pokemon.user_pokemon.pokemon.name}
            type={pokemon.user_pokemon.pokemon.type}
            back_img={pokemon.user_pokemon.pokemon.back_img}
            front_img={pokemon.user_pokemon.pokemon.front_img}
            move_1={pokemon.user_pokemon.pokemon.move_1}
            move_2={pokemon.user_pokemon.pokemon.move_2}
            hp={pokemon.user_pokemon.pokemon.hp}
            xp={pokemon.user_pokemon.pokemon.xp}
            lvl={pokemon.user_pokemon.pokemon.lvl}
          />
        ))}
      </div>

      <div className="captured_pokemons_div">
        <h2>Captured Pokemon</h2>
        {capturedPokemons.map((pokemon) => (
          <TeamPokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            type={pokemon.type}
            back_img={pokemon.back_img}
            front_img={pokemon.front_img}
            move_1={pokemon.move_1}
            move_2={pokemon.move_2}
            hp={pokemon.hp}
            xp={pokemon.xp}
            lvl={pokemon.lvl}
          />
        ))}
      </div>
    </>
  );
};

export default HousePage;
