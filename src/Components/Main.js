import React from 'react';
import './Main.css';
import LFSR from './LFSR';

const Main = () => {
  const matrix = [
    [1, 1, 1],
    [1, 1, 1],
    [0, 1, 0],
  ];
  return (
    <div className='main'>
      <h2>Linear-feedback shift register</h2>
      <p>
        Companion matrix:
        {matrix.map((q) => (
          <div className='matrix-item'>{q}</div>
        ))}
      </p>
      <LFSR matrix={matrix} input={[1, 0, 0]} />
    </div>
  );
};

export default Main;
