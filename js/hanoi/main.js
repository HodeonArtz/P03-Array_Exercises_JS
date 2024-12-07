"use strict";
/**
 * @typedef {Object} Rod
 * @property {Element} element
 * @property {Element[]} disks
 */

/**
 * @returns {Rod}
 */
const rods = [
  {
    element: document.querySelector(".hanoi__rod-1 .hanoi__disks-container"),
    disks: [],
  },
  {
    element: document.querySelector(".hanoi__rod-2 .hanoi__disks-container"),
    disks: [],
  },
  {
    element: document.querySelector(".hanoi__rod-3 .hanoi__disks-container"),
    disks: [],
  },
];

const rodElements = [...document.querySelectorAll(".hanoi__disks-container")];

/**
 * @returns {Element|Node}
 */
let selectedDisk = null;

/**
 *
 * @param {number} diskNumber
 * @param {function} handleOnClick
 * @returns {Element}
 */
function generateDisk(diskNumber, handleOnClick = undefined) {
  if (diskNumber < 1 || diskNumber > 5) {
    throw new Error(`Error generating disk with disk number ${diskNumber}`);
  }

  const buttonDisk = document.createElement("button"),
    itemDisk = document.createElement("li");

  buttonDisk.classList.add("hanoi__disk");
  buttonDisk.dataset.isSelected = false;
  buttonDisk.dataset.diskNum = diskNumber;
  buttonDisk.textContent = diskNumber;
  if (handleOnClick) buttonDisk.addEventListener("click", handleOnClick);

  itemDisk.classList.add("hanoi__disk__container");
  itemDisk.appendChild(buttonDisk);

  return itemDisk;
}

/**
 *
 * @param {number} numberOfDisks
 */
function setStartGame(numberOfDisks) {
  if (numberOfDisks < 2 || numberOfDisks > 5)
    throw new Error(`Number of disks should be between 2-5: ${numberOfDisks}`);

  rods.forEach((rod) => {
    rod.disks = [];
  });

  rodElements.forEach((rodElement) => {
    rodElement.innerHTML = "";
    rodElement.dataset.diskLength = numberOfDisks;
  });

  for (let diskNum = 1; diskNum <= numberOfDisks; diskNum++) {
    const diskGenerated = generateDisk(diskNum, handleOnSelectDisk);
    rodElements[0].appendChild(diskGenerated);
    rods[0].disks.push(diskGenerated.querySelector("button"));
  }

  selectedDisk = null;
}

// <<===========||===========||===========||===========>>

function showStartScreen() {
  document.querySelector(".game__start").style.display = "";
  document.querySelector(".game__in-game").style.display = "none";
}
function showInGameScreen() {
  document.querySelector(".game__start").style.display = "none";
  document.querySelector(".game__in-game").style.display = "";
}

// <<===========||===========||===========||===========>>

/**
 *
 * @param {Event|undefined} event
 */
function handleOnStartGame(event) {
  event?.preventDefault();
  const disksAmount = +document.querySelector("#number-of-disks").value;

  showInGameScreen();
  setStartGame(disksAmount);
}

const gameSettingsForm = document.querySelector(".game__start__settings");
gameSettingsForm.addEventListener("submit", handleOnStartGame);

// <<===========||===========||===========||===========>>

/**
 * @param {Event|undefined} event
 */
function handleOnEndGame(event) {
  event?.preventDefault();
  showStartScreen();
}

const endGameButton = document.querySelector(".game__in-game__btn-end-game");
endGameButton.addEventListener("click", handleOnEndGame);

// <<===========||===========||===========||===========>>

/**
 *
 * @param {Element} disk
 * @returns {number} 1-3
 */
function getRodPosition(disk) {
  return rods.findIndex((rod) => rod.disks.includes(disk));
}

function getDiskNumber(disk) {
  return +disk.dataset.diskNum;
}

/**
 * get all numbers from an array of disks
 * @param {Element[]} rodDisks
 * @returns {number[]}
 */
function getDisksNumbers(rodDisks) {
  return rodDisks.map((disk) => getDiskNumber(disk));
}

/**
 *
 * @param {Element[]} rods
 */
function removeDiskGhosts(rods) {
  rods.forEach((rodElement) => {
    [...rodElement.querySelectorAll("li:has(.disk-ghost)")].forEach((disk) =>
      disk.remove()
    );
  });
}

/**
 * @param {Event|undefined} event
 */
function handleOnSelectDisk(event) {
  const currentSmallestNumber = getDisksNumbers(
    rods[getRodPosition(event.target)].disks
  )[0];

  const clickedNumber = getDiskNumber(event.target);

  if (currentSmallestNumber < clickedNumber) return;

  if (selectedDisk === event.target) {
    selectedDisk.dataset.isSelected = false;
    selectedDisk = null;
    removeDiskGhosts(rodElements);
    return;
  }
  selectedDisk = event.target;

  selectedDisk.dataset.isSelected = true;
}

// <<===========||===========||===========||===========>>
// TODO: show selected disk with 0.5 opacity on hover rods

/**
 *
 * @param {Element|Node} disk
 * @returns {Element|Node}
 */
function generateDiskGhost(disk) {
  const diskGhost = generateDisk(+disk.dataset.diskNum);
  diskGhost.querySelector("button").classList.add("disk-ghost");
  return diskGhost;
}

/**
 *
 * @param {Element} rod
 * @returns {Rod}
 */
function getRodObject(rodElement) {
  return rods.find((rod) => rod.element === rodElement);
}

/**
 * @param {Event|undefined} event
 */
function handleOnHoverRod(event) {
  if (!selectedDisk) return;

  const hoveredRod = getRodObject(event.currentTarget);

  if (hoveredRod.disks.includes(selectedDisk)) {
    return;
  }
  if (getDiskNumber(selectedDisk) > getDisksNumbers(hoveredRod.disks)[0]) {
    return;
  }

  removeDiskGhosts(
    rodElements.filter((rodElement) => rodElement !== hoveredRod.element)
  );

  if (!hoveredRod.element.querySelector(".disk-ghost")) {
    hoveredRod.element.appendChild(generateDiskGhost(selectedDisk));
  }
}

rodElements.forEach((rod) => {
  rod.addEventListener("mouseover", handleOnHoverRod);
});
