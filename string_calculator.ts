import { sum, escapeRegExp } from 'lodash';

export function add(input: string) {
  if (input.length === 0) return 0;

  const { separators, remainingInput } = parseSeparators(input);

  return sum(
    parseNumbers(
      remainingInput,
      new RegExp(separators.map(escapeRegExp).join('|'))
    )
  );
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

function parseNumbers(input: string, separatorRegex: RegExp): number[] {
  const numbersAsStrings = input.split(separatorRegex);
  return numbersAsStrings.map(numberAsString => parseInt(numberAsString, 10));
}
