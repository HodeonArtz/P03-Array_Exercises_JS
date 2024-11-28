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

/**
 *
 * @param {number[]} arrayNumbers
 * @returns
 */
function getFirstAndLastNum(arrayNumbers) {
  return [arrayNumbers[0], arrayNumbers[arrayNumbers.length - 1]];
}

dom.handleOnClick(dom.btnShowValues, () => {
  dom.generateNumbersMatrix(dom.exercise3, firstAndLastNumsMatrix);
});

// >>=====>>====>>====#[<| Exercise 4 |>]#====<<====<<=====<<
// Remove last value from arrays
dom.handleOnClick(dom.btnRemoveValue, () => {
  llista_numeros.pop();
  dom.generateNumbersVector(dom.exercise1, llista_numeros);
  llista_bidimensional.forEach((numberRow) => numberRow.pop());
  dom.generateNumbersMatrix(dom.exercise2, llista_bidimensional);
});

// >>=====>>====>>====#[<| Exercise 5 |>]#====<<====<<=====<<
// Add values at the end of llista_numeros' array
dom.handleOnClick(dom.btnAddValue, () => {
  llista_numeros.push(Math.floor(api.generateRandomNumber(1, 5)));
  dom.generateNumbersVector(dom.exercise1, llista_numeros);
});
