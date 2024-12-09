export const generateRandomNumber = (min, max) =>
  Math.random() * (max - min) + min;

export function generateRandomNumbers(min, max, length) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * (max - min) + min)
  );
}
