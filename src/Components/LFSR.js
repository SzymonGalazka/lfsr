import React from 'react';
import { isArrayInArray, toDecimal } from '../Helpers';

const LFSR = ({ matrix, input }) => {
  const generateCycle = () => {
    const cycle = [input];

    const calculateNextValue = (node) => {
      return node.map((q, i) => {
        let acc = 0;
        matrix[i].forEach((mval, j) => {
          if (mval === 1) acc += node[j];
        });
        return acc % 2;
      });
    };

    while (true) {
      const nextNode = calculateNextValue(cycle[cycle.length - 1]);
      if (isArrayInArray(cycle, nextNode)) {
        cycle.push(nextNode);
        return cycle;
        // return cycle.map((binaryVal) => toDecimal(binaryVal.join('')));
      }
      cycle.push(nextNode);
    }
  };
  const cycle = generateCycle();
  return (
    <div>
      <h3>Cycle length: {cycle.length}</h3>
      <h5>Start node: {input}</h5>
      <div>
        {cycle.map((node, i) => (
          <p key={i}>
            {node} ({toDecimal(node.join(''))})
          </p>
        ))}
      </div>
    </div>
  );
};

export default LFSR;
