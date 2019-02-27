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

    it(`returns the sum of two numbers separated by ','`, () => {
      expect(add('11,13')).to.equal(24);
    });

    it(`returns sum of three numbers separated by ','`, () => {
      expect(add('11,13,100')).to.equal(124);
    });

    it(`suports new line as additional separator`, () => {
      expect(add('11\n13,100')).to.equal(124);
    });

    it(`supports custom separator specified with a prefix`, () => {
      expect(add('//;\n11;25')).to.equal(36);
    });

    it(`supports custom separator and escapes it`, () => {
      expect(add('//*\n11*25')).to.equal(36);
    });

    it(`supports custom separators mixed with default ones`, () => {
      expect(add('//*\n11\n13*100,200')).to.equal(324);
    });

    it(`throws an error for negative numbers`, () => {
      expect(() => add('-10')).to.throw();
    });

    it(`includes the negative numbers in the error message of negative numbers`, () => {
      expect(() => add('-10,5,-13')).to.throw(
        'Negatives not allowed: -10, -13'
      );
    });
  });
});
