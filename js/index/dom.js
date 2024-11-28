/**
 * Parent div from first exercise
 */
export const exercise1 = document.querySelector(".exercise__1 .random-numbers");

export const exercise2 = document.querySelector(".exercise__2 .random-numbers");

export const exercise3 = document.querySelector(".exercise__3 #resultats");

export const selectedScreen = document.querySelector(".selected-screen");

export const btnShowValues = document.querySelector(
  ".exercise__3 .show-values"
);

export const btnRemoveValue = document.querySelector(
  ".exercise__4 .remove-values"
);

export const btnAddValue = document.querySelector(".exercise__5 .add-value");

export const btnModifyValue = document.querySelector(
  ".exercise__6 .modify-value"
);

export const btnDeleteValue = document.querySelector(
  ".exercise__6 .delete-value"
);

export const btnAddIntroducedValue = document.querySelector(
  ".exercise__6 .add-value"
);

export const btnCancelSelection = document.querySelector(
  ".exercise__6 .cancel"
);

export const inputNumberValue = document.querySelector(
  ".exercise__6 .number-value"
);

inputNumberValue.addEventListener("change", () => {
  if (+inputNumberValue.value < 1) {
    inputNumberValue.value = 1;
    return;
  }
  if (+inputNumberValue.value > 5) {
    inputNumberValue.value = 5;
    return;
  }
  inputNumberValue.value = +inputNumberValue.value;
});

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

  vector.forEach((number, i) => {
    const squareDiv = createSquareDiv(number);
    squareDiv.dataset.index = i;
    appendChild(parentElement, squareDiv);
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

export function hideSelectedScreen() {
  inputNumberValue.value = 1;
  selectedScreen.classList.add("hidden");
}
export function showSelectedScreen() {
  selectedScreen.classList.remove("hidden");
}

/**
 * Function to handle clicks on elements
 * @param {Element} element
 * @param {function} handleOnClick
 */
export function handleOnClick(element, handleOnClick) {
  element.addEventListener("click", handleOnClick);
}

/**
 *
 * @param {Element} parentElement
 * @returns {NodeList}
 */
export function getAllNumbers(parentElement) {
  return parentElement.querySelectorAll(".square");
}

/**
 * Handles the passed list of arrays
 * @param {NodeList} elements List of elements to handle
 * @param {function} handleOnClick
 */
export function handleOnClickAll(elements, handleOnClick) {
  [...elements].forEach((element) => {
    element.addEventListener("click", (e) => {
      handleOnClick(element, e);
    });
  });
}
