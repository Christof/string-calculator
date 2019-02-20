import { escapeRegExp } from 'lodash';

interface ParseSeparatorsResult {
  separatorsRegex: RegExp;
  remainingInput: string;
}
export class StringCalculator {
  static parseSeparators(input: string): ParseSeparatorsResult {
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

  static add(input: string): number {
    if (input.length === 0) return 0;

    const separatorsParseResult = StringCalculator.parseSeparators(input);

    const numbersAsStrings = separatorsParseResult.remainingInput.split(
      separatorsParseResult.separatorsRegex
    );
    const numbers = numbersAsStrings.map(s => parseInt(s, 10));

    if (numbers.some(number => number <= 0)) {
      const negatives = numbers.filter(number => number <= 0);
      throw new RangeError('Negatives not allowed: ' + negatives.join(','));
    }

    return numbers.reduce((accumulator, number) => accumulator + number, 0);
  }
}
