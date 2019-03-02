import { sum, escapeRegExp } from 'lodash';

export function add(input: string): number {
  if (input.length === 0) return 0;

  const { separators, remainingInput } = parseSeparators(input);
  const numbersAsStrings = remainingInput.split(
    createSeparatorsRegExp(separators)
  );
  const numbers = parseNumbers(numbersAsStrings);

  if (numbers.some(isNegative)) {
    const negatives = numbers.filter(isNegative);
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

function isNegative(number: number): boolean {
  return number < 0;
}
