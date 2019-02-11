export class StringCalculator {
  static add(input: string): number {
    if (input.length === 0) return 0;

    const radix = 10;
    return parseInt(input, radix);
  }
}
