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

function sum(numbers: number[]): number {
  return numbers.reduce((accumulator, number) => accumulator + number);
}

export class StringCalculator {
  static add(input: string): number {
    if (input.length === 0) return 0;

    const customSeparatorRegex = /\/\/(.*)\n(.*)/;
    const customSeparatorMatch = input.match(customSeparatorRegex);
    if (customSeparatorMatch) {
      const customSeparator = customSeparatorMatch[1];
      const separatorRegex = new RegExp(`,|\n|${customSeparator}`);
      return sum(
        splitStringByRegexAndParseIntegers(
          customSeparatorMatch[2],
          separatorRegex
        )
      );
    }

    const matchCommaOrNewLine = /,|\n/;
    return sum(splitStringByRegexAndParseIntegers(input, matchCommaOrNewLine));
  }
}
