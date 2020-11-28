import React from 'react';
import { isArrayInArray } from '../Helpers';

const LFSR = ({ matrix, input }) => {
  const generateCycle = () => {
    const cycle = [input];

    const calculateNextValue = (node) => {
      const nextVal = node.map((q, i) => {
        let acc = 0;
        matrix[i].forEach((mval, j) => {
          if (mval === 1) acc += node[j];
        });
        return acc % 2;
      });
      return nextVal;
    };
    while (true) {
      const nextNode = calculateNextValue(cycle[cycle.length - 1]);
      if (isArrayInArray(cycle, nextNode)) {
        cycle.push(nextNode);
        return cycle;
      }
      cycle.push(nextNode);
      //   return cycle.map((binaryVal) => toDecimal(binaryVal.join('')));
    }
  };

  return <div>{generateCycle()}</div>;
};

export default LFSR;
