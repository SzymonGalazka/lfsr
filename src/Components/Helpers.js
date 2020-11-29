export const getRandomInt = (max) =>
  Math.floor(Math.random() * Math.floor(max));

export const toBinary = (n) => {
  let binary = '';
  if (n < 0) {
    n = n >>> 0;
  }
  while (Math.ceil(n / 2) > 0) {
    binary = (n % 2) + binary;
    n = Math.floor(n / 2);
  }
  return binary;
};

export const toBinaryArrWithLeadingZeroes = (n, length) => {
  let binary = toBinary(n);
  while (binary.length < length) {
    binary = '0' + binary;
  }
  binary = binary.split('').map((n) => parseInt(n));
  return binary;
};

export const toDecimal = (n) => parseInt(n, 2);

export const isArrayInArray = (arr, item) =>
  arr.some((r) => r.every((value, index) => item[index] === value));

export const arraysEqual = (_arr1, _arr2) => {
  if (
    !Array.isArray(_arr1) ||
    !Array.isArray(_arr2) ||
    _arr1.length !== _arr2.length
  ) {
    return false;
  }

  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};

export const getColor = () =>
  'hsl(' +
  360 * Math.random() +
  ',' +
  (25 + 70 * Math.random()) +
  '%,' +
  (85 + 10 * Math.random()) +
  '%)';
