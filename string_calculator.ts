export function add(input: string): number {
  if (input.length === 0) return 0;

  return parseInt(input, 10);
}
