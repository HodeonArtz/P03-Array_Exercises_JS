"use strict";

import * as dom from "./dom.js";
import * as api from "./api.js";

// >>=====>>====>>====#[<| Exercise 1 |>]#====<<====<<=====<<
// Generate 5 random numbers on each new div
const llista_numeros = Array.from({ length: 5 }, () =>
  Math.floor(api.generateRandomNumber(1, 10))
);

llista_numeros.forEach((randomNumber) => {
  dom.createSquareDiv(dom.exercise1, randomNumber);
});
