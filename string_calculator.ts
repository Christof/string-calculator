import { escapeRegExp } from 'lodash';

interface ParseSeparatorsResult {
  separatorsRegex: RegExp;
  remainingInput: string;
}
export class StringCalculator {
  static parseSeparators(input: string): ParseSeparatorsResult {
    if (input.startsWith('//')) {
      const startOfContent = input.indexOf('\n');
      const separator = input.slice(2, startOfContent);
      return {
        separatorsRegex: new RegExp(escapeRegExp(separator)),
        remainingInput: input.slice(startOfContent + 1)
      };
    }

    return {
      separatorsRegex: /,|\n/,
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

    return numbers.reduce((accumulator, number) => accumulator + number, 0);
  }
}
