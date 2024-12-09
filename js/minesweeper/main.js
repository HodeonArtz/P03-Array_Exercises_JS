/**
 * @returns {HTMLObjectElement[][] | HTMLElement[][]}
 */
const mineGrid = [...document.querySelectorAll(".mine-grid__row")].map(
  (row) => [...row.querySelectorAll(".mine-grid__col")]
);

function getMineGridNumbers() {
  return mineGrid.map((row) => row.map((col) => +col.dataset.mineNum));
}

/**
 *
 * @param {HTMLObjectElement | HTMLElement} col
 * @param {{number{number}, state{"hidden","cleared", "flagged"}}} param1
 */
function setColData(col, { number, state }) {
  if (number) {
    col.dataset.mineNum = number;
    col.textContent = number;
  }
  if (state) {
    col.dataset.state = state;
  }
}
