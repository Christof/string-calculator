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

    it(`returns the sum of two given numbers separated by ',', e.g. '1,2' returns 3`, () => {
      expect(add('1,2')).to.equal(3);
    });
  });
});
