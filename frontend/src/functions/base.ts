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

export const loremIpsum =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";
