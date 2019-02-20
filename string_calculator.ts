export class StringCalculator {
  static add(input: string): number {
    if (input.length === 0) return 0;

    return parseInt(input);
  }
}
