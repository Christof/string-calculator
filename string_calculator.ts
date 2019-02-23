export function add(input: string): number {
  if (input.length === 0) return 0;

  if (input.startsWith('//')) {
    const endOfCustomSeparator = input.indexOf('\n');
    const customSeparator = input.slice(2, endOfCustomSeparator);
    const remainingInput = input.slice(endOfCustomSeparator + 1);

    const numbers = parseNumbers(remainingInput, new RegExp(customSeparator));
    return numbers.reduce((sum, number) => sum + number);
  }

  const numbers = parseNumbers(input, /,|\n/);
  return numbers.reduce((sum, number) => sum + number);
}

function parseNumbers(input: string, separators: RegExp): number[] {
  const numbersAsStrings = input.split(separators);

  return numbersAsStrings.map(numberAsString => parseInt(numberAsString, 10));
}
