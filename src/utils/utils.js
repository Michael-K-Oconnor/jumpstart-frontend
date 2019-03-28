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

const isValidPledgeAmount = num => {
  if (Number(num) > 0) {
    if (num.split('.')[1]) {
      return num.split('.')[1].length < 3;
    }
    return true;
  }
  return false;
};

/* eslint-disable no-unused-vars */
// unused vars left in for potential future use cases
const formatTimeStamp = timeStamp => {
  const [year, month, day] = timeStamp.slice(0, 10).split('-');
  const [hour, min, second] = timeStamp.slice(11, 19).split(':');
  const pm = parseInt(hour, 10) >= 12 ? 'pm' : 'am';
  return `${month}/${day} ${hour}:${min}${pm}`;
};
/* eslint-enable no-unused-vars */

const calcFundedRatio = (pledged, goal) =>
  `${Math.min(
    Math.ceil((pledged / goal) * (window.innerWidth * 0.35 * 0.9)),
    window.innerWidth * 0.35 * 0.9
  )}px`;

export { addCommas, isValidPledgeAmount, formatTimeStamp, calcFundedRatio };
