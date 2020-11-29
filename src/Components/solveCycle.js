import { isArrayInArray } from './Helpers';

const solveCycle = (matrix, input) => {
  const generateCycle = () => {
    const cycle = [input];

    const calculateNextValue = (node) =>
      node.map((_, i) => {
        let acc = 0;
        matrix[i].forEach((mval, j) => {
          if (mval === 1) acc += node[j];
        });
        return acc % 2;
      });

    while (true) {
      const nextNode = calculateNextValue(cycle[cycle.length - 1]);
      if (isArrayInArray(cycle, nextNode)) {
        cycle.push(nextNode);
        return cycle;
      }
      cycle.push(nextNode);
    }
  };
  return generateCycle();
};

export default solveCycle;
