import { escapeRegExp, sum } from 'lodash';

function parseInteger(numberAsString: string): number {
  const radix = 10;
  return parseInt(numberAsString, radix);
}

function splitStringByRegexAndParseIntegers(
  input: string,
  separatorRegex: RegExp
): number[] {
  const numbersAsStrings = input.split(separatorRegex);
  return numbersAsStrings.map(numberAsString => parseInteger(numberAsString));
}

export class StringCalculator {
  readonly separatorRegex: RegExp;
  readonly inputWithNumbers: string;

  constructor(private input: string) {
    const customSeparatorRegex = /\/\/(.*)\n(.*)/;
    const customSeparatorMatch = this.input.match(customSeparatorRegex);

    if (customSeparatorMatch) {
      const customSeparator = escapeRegExp(customSeparatorMatch[1]);
      this.separatorRegex = new RegExp(`,|\n|${customSeparator}`);
      this.inputWithNumbers = customSeparatorMatch[2];
    } else {
      this.separatorRegex = /,|\n/;
      this.inputWithNumbers = input;
    }
  }

  add(): number {
    if (this.input.length === 0) return 0;

    const numbers = splitStringByRegexAndParseIntegers(
      this.inputWithNumbers,
      this.separatorRegex
    );

    if (numbers.some(number => number < 0))
      throw Error('Negatives not allowed!');

    return sum(numbers);
  }

  static add(input: string): number {
    return new StringCalculator(input).add();
  }
}
