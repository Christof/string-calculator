import { sum, escapeRegExp } from 'lodash';

export function add(input: string): number {
  if (input.length === 0) return 0;

  const { separators, remainingInput } = parseSeparators(input);
  const numbersAsStrings = remainingInput.split(
    createSeparatorsRegExp(separators)
  );
  const numbers = parseNumbers(numbersAsStrings);

  if (numbers.some(number => number < 0)) {
    const negatives = numbers.filter(number => number < 0);
    throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
  }

  return sum(numbers);
}

function parseSeparators(
  input: string
): { separators: string[]; remainingInput: string } {
  const defaultSeparators = [',', '\n'];
  if (input.startsWith('//')) {
    const endOfSeparator = input.indexOf('\n');
    const customSeparator = input.slice(2, endOfSeparator);
    const remainingInput = input.slice(endOfSeparator + 1);

    return {
      separators: [...defaultSeparators, customSeparator],
      remainingInput
    };
  }

  return { separators: defaultSeparators, remainingInput: input };
}

function parseNumbers(numbersAsStrings: string[]): number[] {
  return numbersAsStrings.map(numberAsString => parseInt(numberAsString, 10));
}

function createSeparatorsRegExp(separators: string[]) {
  return new RegExp(separators.map(escapeRegExp).join('|'));
}
