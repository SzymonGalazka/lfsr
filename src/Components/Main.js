import React, { useState, useEffect } from 'react';
import {
  toDecimal,
  toBinaryArrWithLeadingZeroes,
  getRandomInt,
  getColor,
} from './Helpers';
import './Main.css';
import solveCycle from './solveCycle';
const genie = require('@adrianperea/genie.js');
const { Simulation, Individual, Chromosome } = genie;

const Main = () => {
  const [gaData, setGaData] = useState([]);

  useEffect(() => {
    computeWithGA();
  }, []);

  const matrix = [
    [1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 1],
  ];

  const maxVal = toDecimal(matrix.map((row) => '1').join('')) + 1;

  const computeManually = () => {
    const solvedCycles = [...Array(maxVal)].map((_, i) =>
      solveCycle(matrix, toBinaryArrWithLeadingZeroes(i, matrix.length))
    );
    return solvedCycles.reduce(
      (acc, cycle) => (cycle.length > acc[1] ? [cycle, cycle.length] : acc),
      [[], 0]
    );
  };

  const computeWithGA = () => {
    let metaData = [];
    class CycleFinder extends Simulation {
      calculateFitness(individual, data) {
        const cycle = solveCycle(matrix, individual.getDna(0));
        let score = 0;
        data.bestScore[0][0].forEach((gene, i) => {
          if (gene === cycle[0][i]) ++score;
        });
        const fitness = score / data.bestScore[0][0].length;
        return fitness;
      }
      shouldFinish(top) {
        const winCondition = top.fitness >= 1;
        if (winCondition) setGaData(metaData);
        return winCondition;
      }
    }

    const generateBinaryGene = () => getRandomInt(2);

    const binarySeed = new Chromosome(matrix.length, generateBinaryGene);

    const binaryIndividual = new Individual(binarySeed);

    const config = {
      prototype: binaryIndividual,
      data: { bestScore },
      mutationRate: 0.05,
      popSize: 10,
      numParents: 5,
      maxGenerations: 100,
      selection: genie.ga.Selection.rouletteWheel,
      crossover: genie.ga.Crossover.singlePoint,
      onCalculateFitness(state) {
        metaData.push({
          avgFitness: state.averageFitness,
          gen: state.currentGeneration,
          top: state.top,
          topCycle: solveCycle(matrix, state.top.dna[0].genes),
        });
      },
    };

    const cycles = new CycleFinder(config);
    cycles.start();
  };

  const bestScore = computeManually();
  console.log(bestScore[0][0]);
  return (
    <div className='main'>
      <h2>Linear-feedback shift register</h2>
      <div>
        Companion matrix:
        {matrix.map((row, i) => (
          <div key={i} className='matrix-row'>
            {row.map((q, i) => (
              <div key={i} className='matrix-item'>
                {q}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className='solver-manual'>
        <h4>Longest cycle (computed manually)</h4>
        <div>Length: {bestScore[1]}</div>
        <div>
          {bestScore[0].map((node, i) => (
            <p key={i}>
              {node} ({toDecimal(node.join(''))})
            </p>
          ))}
        </div>
      </div>
      <div>
        <h3>Computed using Genetic Algorithm (refresh for another set): </h3>
      </div>
      {gaData.length > 0 && (
        <div className='solver-list'>
          {gaData.map((iteration, i) => (
            <div
              key={i}
              className='solver-ga'
              style={{ backgroundColor: getColor() }}
            >
              {console.log(iteration)}
              <h3>Generation #{iteration.gen}</h3>
              <div>
                Avg gen fitness ({(iteration.avgFitness / 1).toFixed(4)})
              </div>
              <div>Seed: ({iteration.top.dna[0].genes})</div>

              {i === gaData.length - 1 && (
                <>
                  <div>Top cycle ({iteration.topCycle.length}):</div>
                  <div>
                    {iteration.topCycle.map((node, i) => (
                      <p key={i}>
                        {node} ({toDecimal(node.join(''))})
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
