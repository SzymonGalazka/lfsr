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

export const toDecimal = (n) => parseInt(n, 2);

export const isArrayInArray = (arr, item) =>
  arr.some((r) => r.every((value, index) => item[index] === value));
