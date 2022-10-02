import React from 'react';
import '../App.css';
const Square = ({ val, chooseSquare }) => {
  return (
    <div className='game-square' onClick={chooseSquare}>
      {val}
    </div>
  );
};

export default Square;
