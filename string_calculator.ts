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

interface ParseSeparatorsResult {
  separatorRegex: RegExp;
  remainingInput: string;
}

/**
 * Extracts separators from input and returns a regex for the separators
 * and the remaining input.
 *
 * @param input
 */
function parseSeparators(input: string): ParseSeparatorsResult {
  const customSeparatorRegex = /^\/\/(.*)\n.*$/;

  const customSeparatorMatch = input.match(customSeparatorRegex);

  if (!customSeparatorMatch)
    return { separatorRegex: /,|\n/, remainingInput: input };

  const customSeparatorPart = customSeparatorMatch[1];

  const separators = parseCustomSeparators(customSeparatorPart);

  return {
    separatorRegex: new RegExp(`,|\n|${separators.join('|')}`),
    remainingInput: input.slice(customSeparatorPart.length + 1)
  };
}

/**
 * Parses custom separator or separators.
 *
 * @param customSeparatorPart Separator part of the input, i.e. one separator
 * (e.g. ';') or multiple separtors in sequare brackets (e.g. '[|][%]')
 *
 * @returns Array of separators
 */
function parseCustomSeparators(customSeparatorPart: string) {
  return customSeparatorPart
    .split(']')
    .filter(element => element.length)
    .map(element => element.substring(1))
    .map(separator => escapeRegExp(separator));
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
