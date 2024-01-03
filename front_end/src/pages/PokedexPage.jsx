import { useEffect, useState } from "react";
import { pokedexApi } from "../components/utilities";
import PokemonCard from "../components/PokemonCard";

const PokedexPage = () => {
  const [pokemons, setPokemons] = useState();

  const GetPokedex = async () => {
    try {
      const response = await pokedexApi.get("");
      setPokemons(response.data);
    } catch (error) {
      console.error("Error fetching data from pokedex", error);
    }
  };

  useEffect(() => {
    GetPokedex();
  }, []);

  useEffect(() => {
    console.log(pokemons);
  }, [pokemons]); // Log pokemons whenever it changes

  return (
    <div>
      <h2>Pokedex</h2>

      {pokemons && pokemons.length > 0 ? (
        pokemons.map((pokemon) => (
          <PokemonCard
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
        ))
      ) : (
        <h3>No Pokemon in Pokedex</h3>
      )}
    </div>
  );
};

export default PokedexPage;
