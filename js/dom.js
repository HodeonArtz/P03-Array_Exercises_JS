/**
 * Parent div from first exercise
 */
export const exercise1 = document.querySelector(".exercise-1 .random-numbers");

/**
 * Generates a new square div.
 *
 * @param {Element} parentElement indicates where will the squre be generated
 * @param {string} textContent text that the div will contain
 */
export function createSquareDiv(parentElement, textContent) {
  const newSquareDiv = document.createElement("div");
  newSquareDiv.classList.add("square");
  newSquareDiv.textContent = textContent;
  parentElement.appendChild(newSquareDiv);
}
