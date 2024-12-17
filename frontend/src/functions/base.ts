export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function numberToFixedLengthHex(num: number) {
  let hexString = num.toString(16);
  while (hexString.length < 6) {
    hexString = "0" + hexString;
  }

  return hexString.toUpperCase();
}

export function isNumeric(inputString: string) {
  return inputString.trim() === Number.parseInt(inputString).toString().trim();
}

export function randomColorCode(): string {
  let num = getRandomInt(0, 16777215);
  return `#${numberToFixedLengthHex(num)}`;
}

export function stringToHash(str: string): number {
  if (str.length === 0) return 0;

  return str.split("").reduce((hash, char) => {
    return (hash << 5) - hash + char.charCodeAt(0);
  }, 0);
}
