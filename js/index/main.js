"use strict";

import * as dom from "./dom.js";
import * as api from "./api.js";

// >>=====>>====>>====#[<| Exercise 1 |>]#====<<====<<=====<<
// Generate 5 random numbers on each new div
const llista_numeros = Array.from({ length: 5 }, () =>
  Math.floor(api.generateRandomNumber(1, 10))
);

dom.generateNumbersVector(dom.exercise1, llista_numeros);

// >>=====>>====>>====#[<| Exercise 2 |>]#====<<====<<=====<<
// Generate a bidimensional array of numbers

const llista_bidimensional = Array.from({ length: 2 }, () =>
  Array.from({ length: 5 }, () => Math.floor(api.generateRandomNumber(1, 10)))
);

dom.generateNumbersMatrix(dom.exercise2, llista_bidimensional);

// >>=====>>====>>====#[<| Exercise 3 |>]#====<<====<<=====<<
// Show first and last elements from arrays
const firstAndLastNumsMatrix = [
  getFirstAndLastNum(llista_numeros),
  ...llista_bidimensional.map((numberRow) => getFirstAndLastNum(numberRow)),
];

function getFirstAndLastNum(arrayNumbers) {
  return [arrayNumbers[0], arrayNumbers[arrayNumbers.length - 1]];
}

dom.handleOnClick(dom.showValuesExercise3, () => {
  dom.generateNumbersMatrix(dom.exercise3, firstAndLastNumsMatrix);
});
