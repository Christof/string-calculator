export function add(input: string): number {
  if (input.length === 0) return 0;

  if (input.startsWith('//')) {
    const endOfCustomSeparator = input.indexOf('\n');
    const customSeparator = input.slice(2, endOfCustomSeparator);
    const remainingInput = input.slice(endOfCustomSeparator + 1);

    const numbersAsString = remainingInput.split(customSeparator);
    const numbers = numbersAsString.map(numberAsString =>
      parseInt(numberAsString, 10)
    );
    return numbers.reduce((accumulator, number) => accumulator + number);
  }

  const numbersAsString = input.split(/,|\n/);
  const numbers = numbersAsString.map(numberAsString =>
    parseInt(numberAsString, 10)
  );
  return numbers.reduce((accumulator, number) => accumulator + number);
}
