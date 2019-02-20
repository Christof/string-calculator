import { expect } from 'chai';
import { StringCalculator } from './string_calculator';

describe(`StringCalculator`, () => {
  describe(`add`, () => {
    it(`returns 0 for empty string`, () => {
      expect(StringCalculator.add('')).to.equal(0);
    });

    it(`returns a given number, e.g. '1' results in 1`, () => {
      expect(StringCalculator.add('1')).to.equal(1);
    });

    it(`returns sum of two given integers, e.g. '1,2' returns 3`, () => {
      expect(StringCalculator.add('1,2')).to.equal(3);
    });
  });
});
