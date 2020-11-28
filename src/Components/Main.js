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
      <div>LSFR</div>
      <LFSR matrix={matrix} input={[0, 0, 1]} />
    </div>
  );
};

export default Main;
