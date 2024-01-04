import { useState, useEffect } from "react";

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
  setSelectedIds,
  selectedIds,
  handleToggle,
}) => {
  return (
    <div className='team_poke_div'>
      <h3>{name}</h3>
      <div>type: {type}</div>
      <img src={front_img}></img>
      <div>{move_1}</div>
      <div>{move_2}</div>
      <div>hp: {hp}</div>
      <div>xp: {xp}</div>
      <div>level: {lvl}</div>

      <button className='house_buttons' onClick={() => handleToggle(id)}>
        {selectedIds.includes(id) ? "Unpick" : "Pick"}
      </button>
    </div>
  );
};

export default TeamPokemonCard;
