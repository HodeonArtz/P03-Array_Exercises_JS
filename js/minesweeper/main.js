const scorePoints = document.querySelector(".panel__score");

const generateRandomNumber = (min, max) => Math.random() * (max - min) + min;
function generateRandomNumbers(min, max, length) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * (max - min) + min)
  );
}

/**
 * @returns {HTMLObjectElement[][] | HTMLElement[][]}
 */
const mineGrid = [...document.querySelectorAll(".mine-grid__row")].map(
  (row) => [...row.querySelectorAll(".mine-grid__col")]
);

function getMineGridNumbers() {
  const gridNumber = mineGrid.map((row) =>
    row.map((col) => +col.dataset.mineNum)
  );

  return gridNumber;
}

function getColNumber(col) {
  return +col.dataset.mineNum;
}

function setColData(col, getNumber, state = "hidden") {
  const number = getNumber(+col.dataset.mineNum);
  col.dataset.mineNum = number;
  col.querySelector(".mine-grid__num").textContent =
    number < 0 ? "💣" : number === 0 ? "" : number;
  col.querySelector(".mine-grid__btn").textContent = "";

  col.dataset.state = state;
}

function zeroFillReset() {
  for (let rowIndex = 0; rowIndex < mineGrid.length; rowIndex++) {
    const row = mineGrid[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const col = row[colIndex];
      setColData(col, () => 0);
    }
  }
}
function getSurroundingCols(posRow, posCol) {
  const rows = mineGrid.length;
  const cols = mineGrid[0]?.length || 0;

  const getCellValue = (row, col) => {
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      return mineGrid[row][col];
    }
    return undefined;
  };

  const surroundingCells = [
    getCellValue(posRow - 1, posCol - 1),
    getCellValue(posRow - 1, posCol),
    getCellValue(posRow - 1, posCol + 1),
    getCellValue(posRow, posCol - 1),
    getCellValue(posRow, posCol + 1),
    getCellValue(posRow + 1, posCol - 1),
    getCellValue(posRow + 1, posCol),
    getCellValue(posRow + 1, posCol + 1),
  ];

  return surroundingCells.reduce((acc, cell) => {
    if (cell !== undefined) acc.push(cell);
    return acc;
  }, []);
}

function clearAll() {
  for (let rowIndex = 0; rowIndex < mineGrid.length; rowIndex++) {
    const row = mineGrid[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const col = row[colIndex];
      setColData(col, (number) => number, "cleared");
    }
  }
}

function setRandomMines() {
  zeroFillReset();
  document.querySelector(".panel__emoji").textContent = "🙂";
  scorePoints.textContent = "00";
  mineGrid.forEach((row, indexRow) => {
    const amountOfMines = generateRandomNumber(1, 3);
    const minePositions = generateRandomNumbers(0, 7, amountOfMines);
    row.forEach((col, indexCol) => {
      if (minePositions.includes(indexCol)) {
        setColData(col, () => -1);
        getSurroundingCols(indexRow, indexCol).forEach((cell) => {
          setColData(cell, (number) => (number < 0 ? number : number + 1));
        });
        return;
      }
      if (getColNumber(col) !== 0) {
        return;
      }
    });
  });
  console.table(getMineGridNumbers());
}
setRandomMines();
document.querySelector(".panel__btn-play").addEventListener("click", () => {
  setRandomMines();
});

document.querySelectorAll(".mine-grid__btn").forEach((btn) =>
  btn.addEventListener("click", (event) => {
    const clickedCol = event.currentTarget.closest(".mine-grid__col");

    if (clickedCol.dataset.mineNum < 0) {
      clearAll();
      document.querySelector(".panel__emoji").textContent = "😵";
      event.currentTarget.parentNode.querySelector(
        ".mine-grid__num"
      ).textContent = "💥";
      return;
    }
    scorePoints.textContent =
      +scorePoints.textContent + +clickedCol.dataset.mineNum;
    clickedCol.dataset.state = "cleared";
  })
);
