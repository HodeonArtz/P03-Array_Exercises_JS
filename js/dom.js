export const exercise1 = document.querySelector(".exercise1 .random-numbers");

/**
 * Crea un div cuadrado.
 *
 * @param {Element} parentElement selecciona dónde va a estar el nuevo div
 * @param {string} textContent contenido que va a tener el div
 */
export function createSquareDiv(parentElement, textContent) {
  const newSquareDiv = document.createElement("div");
  newSquareDiv.classList.add("square");
  newSquareDiv.textContent = textContent;
  parentElement.appendChild(newSquareDiv);
}
