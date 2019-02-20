import { escapeRegExp } from 'lodash';

interface ParseSeparatorsResult {
  separatorsRegex: RegExp;
  remainingInput: string;
}
export namespace StringCalculator {
  function parseSeparators(input: string): ParseSeparatorsResult {
    const defaultSeparators = ',|\n';
    if (input.startsWith('//')) {
      const startOfContent = input.indexOf('\n');
      const separator = input.slice(2, startOfContent);
      return {
        separatorsRegex: new RegExp(
          `${defaultSeparators}|${escapeRegExp(separator)}`
        ),
        remainingInput: input.slice(startOfContent + 1)
      };
    }

    return {
      separatorsRegex: new RegExp(defaultSeparators),
      remainingInput: input
    };
  }

  export function add(input: string): number {
    if (input.length === 0) return 0;

    const separatorsParseResult = parseSeparators(input);

    const numbersAsStrings = separatorsParseResult.remainingInput.split(
      separatorsParseResult.separatorsRegex
    );
    const numbers = numbersAsStrings.map(s => parseInt(s, 10));

    throwErrorForNegativeNumbers(numbers);

    return numbers.reduce((accumulator, number) => accumulator + number, 0);
  }

  function throwErrorForNegativeNumbers(numbers: number[]) {
    if (numbers.some(isNegative)) {
      const negatives = numbers.filter(isNegative);
      throw new RangeError('Negatives not allowed: ' + negatives.join(','));
    }
  }
}

function isNegative(number: number) {
  return number <= 0;
}
