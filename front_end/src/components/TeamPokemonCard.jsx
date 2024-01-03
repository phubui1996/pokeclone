const TeamPokemonCard = ({
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
    <div>
      <h3>{name}</h3>
      <div>type: {type}</div>
      <img src={front_img}></img>
      <div>{move_1}</div>
      <div>{move_2}</div>
      <div>hp: {hp}</div>
      <div>xp: {xp}</div>
      <div>level: {lvl}</div>
    </div>
  );
};

export default TeamPokemonCard;
