import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { teamApi, pokeApi } from "../components/utilities";
import TeamPokemonCard from "../components/TeamPokemonCard";

// path: "house/",

const HousePage = () => {
  const [teamPokemons, setTeamPokemons] = useState([]);
  const [capturedPokemons, setCapturePokemons] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

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
      setCapturePokemons(response.data);
    } catch (error) {
      console.error("Error fetching data from capture pokemon", error);
    }
  };

  const fetchData = async () => {
    try {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        // Set Authorization header for teamApi
        teamApi.defaults.headers.common[
          "Authorization"
        ] = `Token ${storedToken}`;
        pokeApi.defaults.headers.common[
          "Authorization"
        ] = `Token ${storedToken}`;

        await Promise.all([getTeamPokemons(), getCapturedPokemons()]);
      } else {
        console.log("Token not found in local storage");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPokemonId = () => {
    setSelectedIds(
      teamPokemons.map((pokemon) => {
        return pokemon.user_pokemon.pokemon.id;
      })
    );
  };

  const handleToggle = async (pokemonId) => {
    const isSelected = selectedIds.includes(pokemonId);
    let updatedIds;

    try {
      const isSelected = selectedIds.includes(pokemonId);

      if (isSelected) {
        // Unpick the Pokémon
        updatedIds = selectedIds.filter((id) => id == pokemonId);
      } else {
        // Pick the Pokémon
        updatedIds = [...selectedIds, pokemonId];
      }

      // console.log("isSelected:", isSelected);
      // console.log("updatedIds:", updatedIds);

      // Make the API call with updated selectedIds
      await teamApi.post("1/", {
        action: isSelected ? "unpick" : "pick",
        pokemon_ids: updatedIds,
      });

      // After the API call, update the selectedIds state
      setSelectedIds(updatedIds);

      // After the API call, refresh the team data
      await getTeamPokemons();

      // Check if the user has no Pokémon in the team
      if (updatedIds.length === 0) {
        console.log("User has no Pokémon in the team");
      }
    } catch (error) {
      console.error("Error toggling the Pokemon", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Team", teamPokemons);
    console.log("Id", selectedIds);
  }, [teamPokemons, selectedIds]);

  useEffect(() => {
    getPokemonId();
  }, [teamPokemons]);

  return (
    <div className='full_page_div'>
      <div id='house_div'>
        <div className="team_pokemons_div">
          {/* <h2>Team Pokemon</h2> */}
          {teamPokemons &&
            teamPokemons.map((pokemon) => (
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
                setSelectedIds={setSelectedIds}
                selectedIds={selectedIds}
                handleToggle={handleToggle}
              />
            ))}
        </div>


        <div className="captured_pokemons_div">
          {/* <h2>Captured Pokemon</h2> */}
          {capturedPokemons &&
            capturedPokemons.map((pokemon) => (
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
                setSelectedIds={setSelectedIds}
                selectedIds={selectedIds}
                handleToggle={handleToggle}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HousePage;
