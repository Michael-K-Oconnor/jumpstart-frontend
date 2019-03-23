const addCommas = number => {
  let stringNum = '';
  const arrayNum = String(Math.ceil(number))
    .replace(/,/gi, '')
    .split('')
    .reverse();
  for (let i = 0; i < arrayNum.length; i += 1) {
    if (i > 0 && i % 3 === 0) {
      stringNum = `,${stringNum}`;
    }
    stringNum = arrayNum[i] + stringNum;
  }
  return stringNum;
};

const isValidNum = num => {
  if (Number(num) > 0) {
    if (num.split('.')[1]) {
      return num.split('.')[1].length < 3;
    }
    return true;
  }
  return false;
};

export { addCommas, isValidNum };
