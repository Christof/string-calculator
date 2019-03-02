export function add(input: string): number {
  if (input.length === 0) return 0;

  if (input.startsWith('//')) {
    const endOfSeparator = input.indexOf('\n');
    const customSeparator = input.slice(2, endOfSeparator);
    const remainingInput = input.slice(endOfSeparator + 1);

    const numbersAsStrings = remainingInput.split(customSeparator);
    const numbers = numbersAsStrings.map(numberAsString =>
      parseInt(numberAsString, 10)
    );
    return numbers.reduce((accumulator, number) => accumulator + number);
  }

  const numbersAsStrings = input.split(/,|\n/);
  const numbers = numbersAsStrings.map(numberAsString =>
    parseInt(numberAsString, 10)
  );
  return numbers.reduce((accumulator, number) => accumulator + number);
}
