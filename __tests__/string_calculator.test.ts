import { add } from '../string_calculator';

describe(`StringCalculator`, () => {
  describe(`add`, () => {
    it(`returns 0 for empty string`, () => {
      expect(add('')).toEqual(0);
    });

    it(`returns a parsed number`, () => {
      expect(add('9')).toEqual(9);
    });
  });
});
