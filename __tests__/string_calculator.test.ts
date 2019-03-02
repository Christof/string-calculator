import { add } from '../string_calculator';

describe(`StringCalculator`, () => {
  describe(`add`, () => {
    it(`returns 0 for empty string`, () => {
      expect(add('')).toEqual(0);
    });

    it(`returns a parsed number`, () => {
      expect(add('9')).toEqual(9);
    });

    it(`returns the sum of two numbers separated by ','`, () => {
      expect(add('9,98')).toEqual(107);
    });

    it(`returns the sum of three numbers`, () => {
      expect(add('9,98,3')).toEqual(110);
    });
  });
});
