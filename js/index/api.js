/**
 * Generates a random number
 * @param {number} min minimum number
 * @param {number} max maximum number
 * @returns Random number between min and max
 */
export const generateRandomNumber = (min, max) =>
  Math.random() * (max - min) + min;
