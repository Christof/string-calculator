import { sum, escapeRegExp } from 'lodash';

export function add(input: string) {
  if (input.length === 0) return 0;

  const { separators, remainingInput } = parseSeparators(input);

  const numbers = parseNumbers(
    remainingInput,
    createSeparatorsRegex(separators)
  );
  if (numbers.some(isNegative)) {
    const negatives = numbers.filter(isNegative);

    throw new Error('Negatives not allowed: ' + negatives.join(', '));
  }

  return sum(numbers);
}

function parseSeparators(
  input: string
): { separators: string[]; remainingInput: string } {
  const defaultSeparators = [',', '\n'];
  if (input.startsWith('//')) {
    const endOfCustomSeparator = input.indexOf('\n');
    const customSeparator = input.slice(2, endOfCustomSeparator);
    const remainingInput = input.slice(endOfCustomSeparator + 1);
    return {
      separators: [...defaultSeparators, customSeparator],
      remainingInput
    };
  }

  return { separators: defaultSeparators, remainingInput: input };
}

function createSeparatorsRegex(separators: string[]): RegExp {
  return new RegExp(separators.map(escapeRegExp).join('|'));
}

function parseNumbers(input: string, separatorRegex: RegExp): number[] {
  const numbersAsStrings = input.split(separatorRegex);
  return numbersAsStrings.map(numberAsString => parseInt(numberAsString, 10));
}

function isNegative(number: number) {
  return number < 0;
}
