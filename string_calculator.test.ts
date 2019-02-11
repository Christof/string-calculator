import { expect } from 'chai';
import { StringCalculator } from './string_calculator';

describe(`StringCalculator`, () => {
  describe(`add`, () => {
    it(`returns 0 for empty string`, () => {
      expect(StringCalculator.add('')).to.equal(0);
    });

    it(`converts a given string to a number, e.g. '9' to 9`, () => {
      expect(StringCalculator.add('9')).to.equal(9);
    });
  });
});
