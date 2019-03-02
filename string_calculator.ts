import { sum, escapeRegExp } from 'lodash';

export function add(input: string): number {
  if (input.length === 0) return 0;

  const defaultSeparators = [',', '\n'];
  if (input.startsWith('//')) {
    const endOfSeparator = input.indexOf('\n');
    const customSeparator = input.slice(2, endOfSeparator);
    const remainingInput = input.slice(endOfSeparator + 1);

    const numbersAsStrings = remainingInput.split(
      createSeparatorsRegExp([...defaultSeparators, customSeparator])
    );
    const numbers = parseNumbers(numbersAsStrings);
    return sum(numbers);
  }

  const numbersAsStrings = input.split(
    createSeparatorsRegExp(defaultSeparators)
  );
  const numbers = parseNumbers(numbersAsStrings);
  return sum(numbers);
}

function parseNumbers(numbersAsStrings: string[]): number[] {
  return numbersAsStrings.map(numberAsString => parseInt(numberAsString, 10));
}

function createSeparatorsRegExp(separators: string[]) {
  return new RegExp(separators.map(escapeRegExp).join('|'));
}
