function parseInteger(numberAsString: string): number {
  const radix = 10;
  return parseInt(numberAsString, radix);
}

export class StringCalculator {
  static add(input: string): number {
    if (input.length === 0) return 0;

    if (input.includes(',')) {
      const numbersAsStrings = input.split(',');
      const numbers = numbersAsStrings.map(numberAsString =>
        parseInteger(numberAsString)
      );
      return numbers.reduce((accumulator, number) => accumulator + number);
    }

    return parseInteger(input);
  }
}
