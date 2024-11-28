/**
 * Parent div from first exercise
 */
export const exercise1 = document.querySelector(".exercise__1 .random-numbers");

export const exercise2 = document.querySelector(".exercise__2 .random-numbers");

export const exercise3 = document.querySelector(".exercise__3 #resultats");

export const showValues = document.querySelector(".exercise__3 .show-values");

export const removeValue = document.querySelector(
  ".exercise__4 .remove-values"
);

export /**
 * Generates a new square div.
 *
 * @param {string} textContent text that the div will contain
 * @returns {Element} returns a new square div
 */
function createSquareDiv(textContent) {
  const newSquareDiv = document.createElement("div");
  newSquareDiv.classList.add("square");
  newSquareDiv.textContent = textContent;
  return newSquareDiv;
}

/**
 * Appends the passed element to the parent element
 * @param {Element} parentElement
 * @param {Element} childElement
 */
function appendChild(parentElement, childElement) {
  parentElement.appendChild(childElement);
}

/**
 * Generates a vector of numbers.
 * @param {Element} parentElement Element where the numbers will appear, parent element must be empty (no children)
 * @param {number[]} vector Array of numbes
 */
export function generateNumbersVector(parentElement, vector) {
  parentElement.innerHTML = "";
  vector.forEach((number) => {
    appendChild(parentElement, createSquareDiv(number));
  });
}

/**
 * Generates a 2 dimensional array of numbers
 * @param {Element} parentElement Element where the numbers will appear, parent element must be empty (no children)
 * @param {number[][]} matrix Array of arrays of numbers
 */
export function generateNumbersMatrix(parentElement, matrix) {
  parentElement.innerHTML = "";
  matrix.forEach((row) => {
    const newRowElement = document.createElement("div");
    newRowElement.classList.add("square__row");
    generateNumbersVector(newRowElement, row);
    appendChild(parentElement, newRowElement);
  });
}

/**
 * Function to handle clicks on elements
 * @param {Element} element
 * @param {function} handleOnClick
 */
export function handleOnClick(element, handleOnClick) {
  element.addEventListener("click", handleOnClick);
}
