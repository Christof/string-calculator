function parseInteger(numberAsString: string): number {
  const radix = 10;
  return parseInt(numberAsString, radix);
}

export class StringCalculator {
  static add(input: string): number {
    if (input.length === 0) return 0;

    const separator = ',';
    const numbersAsStrings = input.split(separator);
    const numbers = numbersAsStrings.map(numberAsString =>
      parseInteger(numberAsString)
    );
    return numbers.reduce((accumulator, number) => accumulator + number);
  }
}
