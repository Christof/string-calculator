import { escapeRegExp, sum } from 'lodash';

export function add(input: string): number {
  if (input.length === 0) return 0;

  const defaultSeparators = [',', '\n'];
  if (input.startsWith('//')) {
    const endOfCustomSeparator = input.indexOf('\n');
    const customSeparator = input.slice(2, endOfCustomSeparator);
    const remainingInput = input.slice(endOfCustomSeparator + 1);

    const numbersAsString = remainingInput.split(
      createSeparatorsRegex([...defaultSeparators, customSeparator])
    );
    const numbers = numbersAsString.map(numberAsString =>
      parseInt(numberAsString, 10)
    );
    return sum(numbers);
  }

  const numbersAsString = input.split(createSeparatorsRegex(defaultSeparators));
  const numbers = numbersAsString.map(numberAsString =>
    parseInt(numberAsString, 10)
  );
  return sum(numbers);
}

function createSeparatorsRegex(separators: string[]): RegExp {
  return new RegExp(separators.map(escapeRegExp).join('|'));
}
