function parseInteger(numberAsString: string): number {
  const radix = 10;
  return parseInt(numberAsString, radix);
}

export class StringCalculator {
  static add(input: string): number {
    if (input.length === 0) return 0;

    const separatorIndex = input.indexOf(',');
    if (separatorIndex >= 0) {
      const firstNumber = input.substring(0, separatorIndex);
      const secondNumber = input.substring(separatorIndex + 1);

      return parseInteger(firstNumber) + parseInteger(secondNumber);
    }

    return parseInteger(input);
  }
}
