import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { teamApi, pokeApi } from "../components/utilities";
import TeamPokemonCard from "../components/TeamPokemonCard";
import Sound from "react-audio-player";
import housePageMusic from "/src/assets/BackgroundMusic/housepage-music.wav";

// path: "house/",

const HousePage = () => {
  const [capturedPokemons, setCapturePokemons] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const { pokeTeam, setPokeTeam, isLoggedIn } = useOutletContext();

  const navigate = useNavigate()

  const getPokeTeam = async () => {
    try {
      const response = await teamApi.get("manager/");
      setPokeTeam(response.data[0].pokemons);
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

        await Promise.all([getPokeTeam(), getCapturedPokemons()]);
      } else {
        console.log("Token not found in local storage");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPokemonId = () => {
    setSelectedIds(
      pokeTeam.map((pokemon) => {
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
      await getPokeTeam();

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
    if (isLoggedIn === false) {
      navigate('/landing')
    }
  }, []);

  useEffect(() => {
    console.log("Team", pokeTeam);
    console.log("Id", selectedIds);
  }, [pokeTeam, selectedIds]);

  useEffect(() => {
    getPokemonId();
  }, [pokeTeam]);

  return (
    <div className="full_page_div">
      <audio
        autoPlay
        src={housePageMusic}
        loop
        type="audio/wav"
        volume="0.2"
      ></audio>
      <div id="house_div">
        <div className="team_pokemons_div">
          {/* <h2>Team Pokemon</h2> */}
          {pokeTeam &&
            pokeTeam.map((pokemon) => (
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
