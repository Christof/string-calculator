import { sum } from 'lodash';

export function add(input: string): number {
  if (input.length === 0) return 0;

  if (input.startsWith('//')) {
    const endOfSeparator = input.indexOf('\n');
    const customSeparator = input.slice(2, endOfSeparator);
    const remainingInput = input.slice(endOfSeparator + 1);

    const numbersAsStrings = remainingInput.split(customSeparator);
    const numbers = parseNumbers(numbersAsStrings);
    return sum(numbers);
  }

  const numbersAsStrings = input.split(/,|\n/);
  const numbers = parseNumbers(numbersAsStrings);
  return sum(numbers);
}

function parseNumbers(numbersAsStrings: string[]): number[] {
  return numbersAsStrings.map(numberAsString => parseInt(numberAsString, 10));
}
