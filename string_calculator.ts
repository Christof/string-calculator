import { sum, escapeRegExp } from 'lodash';

export function add(input: string): number {
  if (input.length === 0) return 0;

  const { separators, remainingInput } = parseSeparators(input);
  const numbers = parseNumbers(
    remainingInput,
    createSeparatorsRegex(separators)
  );
  return sum(numbers);
}

function parseSeparators(
  input: string
): { separators: string[]; remainingInput: string } {
  const defaultSeparator = [',', '\n'];
  if (!input.startsWith('//'))
    return { separators: defaultSeparator, remainingInput: input };

  const endOfCustomSeparator = input.indexOf('\n');
  const customSeparator = input.slice(2, endOfCustomSeparator);
  const remainingInput = input.slice(endOfCustomSeparator + 1);

  return {
    separators: [...defaultSeparator, customSeparator],
    remainingInput
  };
}

function createSeparatorsRegex(separators: string[]): RegExp {
  return new RegExp(separators.map(escapeRegExp).join('|'));
}

function parseNumbers(input: string, separators: RegExp): number[] {
  const numbersAsStrings = input.split(separators);

  return numbersAsStrings.map(numberAsString => parseInt(numberAsString, 10));
}
