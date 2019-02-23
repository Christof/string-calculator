export function add(input: string): number {
  if (input.length === 0) return 0;

  const numbersAsStrings = input.split(',');

  const numbers = numbersAsStrings.map(numberAsString =>
    parseInt(numberAsString, 10)
  );
  return numbers.reduce((sum, number) => sum + number);
}
