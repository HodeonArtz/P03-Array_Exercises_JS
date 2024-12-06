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
 *
 * @param {number} diskNumber
 * @returns {Element}
 */
function generateDisk(diskNumber) {
  if (diskNumber < 1 || diskNumber > 5) {
    throw new Error(`Error generating disk with disk number ${diskNumber}`);
  }

  const buttonDisk = document.createElement("button"),
    itemDisk = document.createElement("li");

  buttonDisk.classList.add("hanoi__disk");
  buttonDisk.dataset.isSelected = false;
  buttonDisk.dataset.diskNum = diskNumber;
  buttonDisk.textContent = diskNumber;

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
    const diskGenerated = generateDisk(diskNum);
    rodElements[0].appendChild(diskGenerated);
    rods[0].disks.push(diskGenerated);
  }
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
