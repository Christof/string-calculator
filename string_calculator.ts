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

interface SeparatorParseResult {
  separatorRegex: RegExp;
  remainingInput: string;
}

function parseSeparators(input: string): SeparatorParseResult {
  const customSeparatorRegex = /^\/\/(.*)\n.*$/;

  const customSeparatorMatch = input.match(customSeparatorRegex);

  if (!customSeparatorMatch)
    return { separatorRegex: /,|\n/, remainingInput: input };

  const customSeparatorPart = customSeparatorMatch[1];

  const separators = customSeparatorPart
    .split(']')
    .filter(element => element.length)
    .map(element => element.substring(1))
    .map(separator => escapeRegExp(separator));

  return {
    separatorRegex: new RegExp(`,|\n|${separators.join('|')}`),
    remainingInput: input.slice(customSeparatorPart.length + 1)
  };
}

export class StringCalculator {
  private numbers: number[];

  constructor(private input: string) {
    const separatorParseResult = parseSeparators(this.input);

    this.numbers = splitStringByRegexAndParseIntegers(
      separatorParseResult.remainingInput,
      separatorParseResult.separatorRegex
    );
  }

  add(): number {
    if (this.input.length === 0) return 0;

    this.throwForNegativeNumbers();

    return sum(this.numbers.filter(number => number <= 1000));
  }

  static add(input: string): number {
    return new StringCalculator(input).add();
  }

  private throwForNegativeNumbers() {
    if (this.numbers.some(isNegative)) {
      const negativeNumbers = this.numbers.filter(isNegative);
      throw Error('Negatives not allowed: ' + negativeNumbers.join(','));
    }
  }
}
