const PokemonCard = ({
  id,
  name,
  type,
  back_img,
  front_img,
  move_1,
  move_2,
  hp,
  xp,
  lvl,
}) => {


  return (
    <div className='pokedex_card'>
      <h3>{name}</h3>
      <div>type: {type}</div>
      <img src={front_img}></img>
      <div>{move_1}</div>
      <div>{move_2}</div>
    </div>
  );
};

export default PokemonCard;
