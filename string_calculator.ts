import { escapeRegExp, sum } from 'lodash';

export function add(input: string): number {
  if (input.length === 0) return 0;

  const { remainingInput, separators } = parseSeparator(input);

  const numbersAsString = remainingInput.split(
    createSeparatorsRegex(separators)
  );
  const numbers = numbersAsString.map(numberAsString =>
    parseInt(numberAsString, 10)
  );

  if (numbers.some(isNegative)) {
    const negatives = numbers.filter(isNegative);

    throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
  }

  return sum(numbers);
}

function parseSeparator(
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

function isNegative(number: number): boolean {
  return number <= 0;
}
