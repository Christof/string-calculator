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
  static add(input: string): number {
    if (input.length === 0) return 0;

    if (input.startsWith('//')) {
      const customSeparator = input[2];
      const separatorRegex = new RegExp(`,|\n|${customSeparator}`);
      const numbers = splitStringByRegexAndParseIntegers(
        input.substring(4),
        separatorRegex
      );

      return numbers.reduce((accumulator, number) => accumulator + number);
    }

    const matchCommaOrNewLine = /,|\n/;
    const numbers = splitStringByRegexAndParseIntegers(
      input,
      matchCommaOrNewLine
    );
    return numbers.reduce((accumulator, number) => accumulator + number);
  }
}
