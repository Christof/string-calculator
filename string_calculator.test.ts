import { expect } from 'chai';
import { add } from './string_calculator';

describe(`StringCalculator`, () => {
  describe(`add`, () => {
    it(`returns 0 for empty string`, () => {
      expect(add('')).to.equal(0);
    });

    it(`returns a parsed number`, () => {
      expect(add('11')).to.equal(11);
    });

    it(`returns the sum of numbers separated by ','`, () => {
      expect(add('11,13')).to.equal(24);
    });
  });
});
