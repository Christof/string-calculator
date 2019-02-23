import { sum, escapeRegExp } from 'lodash';

export function add(input: string): number {
  if (input.length === 0) return 0;

  const defaultSeparator = [',', '\n'];
  if (input.startsWith('//')) {
    const endOfCustomSeparator = input.indexOf('\n');
    const customSeparator = input.slice(2, endOfCustomSeparator);
    const remainingInput = input.slice(endOfCustomSeparator + 1);

    const separators = [...defaultSeparator, escapeRegExp(customSeparator)];
    const numbers = parseNumbers(
      remainingInput,
      new RegExp(separators.join('|'))
    );
    return sum(numbers);
  }

  const numbers = parseNumbers(input, /,|\n/);
  return sum(numbers);
}

function parseNumbers(input: string, separators: RegExp): number[] {
  const numbersAsStrings = input.split(separators);

  return numbersAsStrings.map(numberAsString => parseInt(numberAsString, 10));
}
