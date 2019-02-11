function parseInteger(numberAsString: string): number {
  const radix = 10;
  return parseInt(numberAsString, radix);
}

export class StringCalculator {
  static add(input: string): number {
    if (input.length === 0) return 0;

    if (input.startsWith('//')) {
      const customSeparator = input[2];
      const matchCommaOrNewLine = new RegExp(`,|\n|${customSeparator}`);
      const numbersAsStrings = input.substring(4).split(matchCommaOrNewLine);
      const numbers = numbersAsStrings.map(numberAsString =>
        parseInteger(numberAsString)
      );
      return numbers.reduce((accumulator, number) => accumulator + number);
    }

    const matchCommaOrNewLine = /,|\n/;
    const numbersAsStrings = input.split(matchCommaOrNewLine);
    const numbers = numbersAsStrings.map(numberAsString =>
      parseInteger(numberAsString)
    );
    return numbers.reduce((accumulator, number) => accumulator + number);
  }
}
