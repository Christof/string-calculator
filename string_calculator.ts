export class StringCalculator {
  static add(input: string): number {
    if (input.length === 0) return 0;

    let separatorRegex = /,|\n/;
    if (input.startsWith('//')) {
      const startOfContent = input.indexOf('\n');
      separatorRegex = new RegExp(input.slice(2, startOfContent));
      input = input.slice(startOfContent + 1);
    }

    const numbersAsStrings = input.split(separatorRegex);
    const numbers = numbersAsStrings.map(s => parseInt(s, 10));

    return numbers.reduce((accumulator, number) => accumulator + number, 0);
  }
}
