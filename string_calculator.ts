export function add(input: string): number {
  if (input.length === 0) return 0;

  const numbersAsString = input.split(/,|\n/);
  const numbers = numbersAsString.map(numberAsString =>
    parseInt(numberAsString, 10)
  );
  return numbers.reduce((accumulator, number) => accumulator + number);
}
