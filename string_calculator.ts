import { escapeRegExp, sum } from 'lodash';

function parseInteger(numberAsString: string): number {
  const radix = 10;
  return parseInt(numberAsString, radix);
}

function isNegative(number: number): boolean {
  return number < 0;
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
    const singleCharacterCustomSeparatorRegex = /\/\/(.)\n(.*)/;
    const multipleCharacterCustomSeparatorRegex = /\/\/\[(.*)\]\n(.*)/;

    const singleCharacterCustomSeparatorMatch = this.input.match(
      singleCharacterCustomSeparatorRegex
    );

    const multipleCharacterCustomSeparatorMatch = this.input.match(
      multipleCharacterCustomSeparatorRegex
    );

    if (singleCharacterCustomSeparatorMatch) {
      const customSeparator = escapeRegExp(
        singleCharacterCustomSeparatorMatch[1]
      );
      this.separatorRegex = new RegExp(`,|\n|${customSeparator}`);
      this.inputWithNumbers = singleCharacterCustomSeparatorMatch[2];
    } else if (multipleCharacterCustomSeparatorMatch) {
      const customSeparator = escapeRegExp(
        multipleCharacterCustomSeparatorMatch[1]
      );
      this.separatorRegex = new RegExp(`,|\n|${customSeparator}`);
      this.inputWithNumbers = multipleCharacterCustomSeparatorMatch[2];
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

    if (numbers.some(isNegative)) {
      const negativeNumbers = numbers.filter(isNegative);
      throw Error('Negatives not allowed: ' + negativeNumbers.join(','));
    }

    return sum(numbers.filter(number => number <= 1000));
  }

  static add(input: string): number {
    return new StringCalculator(input).add();
  }
}
