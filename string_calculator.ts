import { sum } from 'lodash';

export function add(input: string) {
  if (input.length === 0) return 0;

  if (input.startsWith('//')) {
    const endOfCustomSeparator = input.indexOf('\n');
    const customSeparator = input.slice(2, endOfCustomSeparator);
    const remainingInput = input.slice(endOfCustomSeparator + 1);

    return sum(parseNumbers(remainingInput, new RegExp(customSeparator)));
  }

  return sum(parseNumbers(input, /,|\n/));
}

function parseNumbers(input: string, separatorRegex: RegExp): number[] {
  const numbersAsStrings = input.split(separatorRegex);
  return numbersAsStrings.map(numberAsString => parseInt(numberAsString, 10));
}
