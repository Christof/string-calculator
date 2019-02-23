import { expect } from 'chai';
import { add } from './string_calculator';

describe(`StringCalculator`, () => {
  describe(`add`, () => {
    it(`returns 0 for empty string`, () => {
      expect(add('')).to.equal(0);
    });

    it(`converts a given string into a number, e.g. '1' to 1`, () => {
      expect(add('1')).to.equal(1);
    });
  });
});
