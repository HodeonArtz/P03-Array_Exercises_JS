"use strict";
// >>=====>>====>>====#[<| Variables |>]#====<<====<<=====<<

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

const rodElements = [...document.querySelectorAll(".hanoi__disks-container")],
  gameMessage = document.querySelector(".game__in-game__message");

/**
 * @returns {Element|Node}
 */
let selectedDisk = null,
  disksAmount = 0,
  movementsAmount = 0;

// >>=====>>====>>====#[<| Game messages |>]#====<<====<<=====<<
function setStartMessage() {
  gameMessage.textContent = "Move all the disks to the dark tower!";
}
function setSelectedDiskMessage(diskNumber) {
  gameMessage.textContent = `Disk #${diskNumber} selected.`;
}
function setEndMessage(movementsNumber) {
  gameMessage.textContent = `Congrats! 🎉 You moved disks with ${movementsNumber} moves.`;
}

// >>=====>>====>>====#[<| Disk generation |>]#====<<====<<=====<<

function generateDiskItem() {
  const itemDisk = document.createElement("li");
  itemDisk.classList.add("hanoi__disk__container");
  return itemDisk;
}

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
    itemDisk = generateDiskItem();

  buttonDisk.classList.add("hanoi__disk");
  buttonDisk.dataset.isSelected = false;
  buttonDisk.dataset.diskNum = diskNumber;
  buttonDisk.textContent = diskNumber;
  if (handleOnClick) buttonDisk.addEventListener("click", handleOnClick);

  itemDisk.appendChild(buttonDisk);

  return itemDisk;
}

// >>=====>>====>>====#[<| Show specific sreen |>]#====<<====<<=====<<

function showStartScreen() {
  document.querySelector(".game__start").style.display = "";
  document.querySelector(".game__in-game").style.display = "none";
}
function showInGameScreen() {
  document.querySelector(".game__start").style.display = "none";
  document.querySelector(".game__in-game").style.display = "";
}
// >>=====>>====>>====#[<| handling start button |>]#====<<====<<=====<<

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
  disksAmount = numberOfDisks;
  setStartMessage();
}

/**
 *
 * @param {Event|undefined} event
 */
function handleOnStartGame(event) {
  event?.preventDefault();
  const disksAmount = +document.querySelector("#number-of-disks").value;

  showInGameScreen();
  setStartGame(disksAmount);
  movementsAmount = 0;

  rodElements.forEach((rod) => {
    rod.addEventListener("mouseover", handleOnHoverRod);
    rod.addEventListener("click", handleOnClickRod);
  });
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
  if (selectedDisk) {
    return;
  }

  selectedDisk = event.target;

  selectedDisk.dataset.isSelected = true;

  setSelectedDiskMessage(clickedNumber);
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

  removeDiskGhosts(
    rodElements.filter((rodElement) => rodElement !== hoveredRod.element)
  );
  if (hoveredRod.disks.includes(selectedDisk)) {
    return;
  }
  if (getDiskNumber(selectedDisk) > getDisksNumbers(hoveredRod.disks)[0]) {
    return;
  }

  if (!hoveredRod.element.querySelector(".disk-ghost")) {
    hoveredRod.element.prepend(generateDiskGhost(selectedDisk));
  }
}

// <<===========||===========||===========||===========>>

/**
 * @param {Event|undefined} event
 */
function handleOnClickRod(event) {
  // Do nothing until user selects a disk
  if (!selectedDisk) return;

  const clickedRod = getRodObject(event.currentTarget);

  if (clickedRod.disks.includes(selectedDisk)) {
    return;
  }

  if (getDiskNumber(selectedDisk) > getDisksNumbers(clickedRod.disks)[0]) {
    return;
  }

  removeDiskGhosts(rodElements);

  // be careful with this part
  rods[getRodPosition(selectedDisk)].disks = rods[
    getRodPosition(selectedDisk)
  ].disks.filter((disk) => disk !== selectedDisk);

  clickedRod.disks.unshift(selectedDisk);

  const diskItem = generateDiskItem();

  selectedDisk.closest("li").remove();
  diskItem.appendChild(selectedDisk);
  clickedRod.element.prepend(diskItem);
  movementsAmount++;
  selectedDisk.dataset.isSelected = false;
  selectedDisk = null;

  if (rods[2].disks.length === disksAmount) {
    rods.forEach((rod) => {
      rod.element.removeEventListener("mouseover", handleOnHoverRod);
      rod.element.removeEventListener("click", handleOnClickRod);

      rod.disks.forEach((disk) => {
        disk.removeEventListener("click", handleOnSelectDisk);
      });
    });
    setEndMessage(movementsAmount);
    return;
  }
  setStartMessage();
}
