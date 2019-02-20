export class StringCalculator {
  static add(input: string): number {
    if (input.length === 0) return 0;

    const separatorRegex = /,|\n/;
    const numbersAsStrings = input.split(separatorRegex);
    const numbers = numbersAsStrings.map(s => parseInt(s, 10));

    return numbers.reduce((accumulator, number) => accumulator + number, 0);
  }
}
