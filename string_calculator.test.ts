import { expect } from 'chai';
import { add } from './string_calculator';

describe(`StringCalculator`, () => {
  describe(`add`, () => {
    it(`returns 0 for empty string`, () => {
      expect(add('')).to.equal(0);
    });

    it(`returns a number given as string`, () => {
      expect(add('10')).to.equal(10);
    });

    it(`returns the sum of numbers separated by ','`, () => {
      expect(add('10,2')).to.equal(12);
    });

    it(`returns the sum of three numbers separated by ','`, () => {
      expect(add('10,2,200')).to.equal(212);
    });

    it(`supports new line as additional separator`, () => {
      expect(add('10\n2\n200')).to.equal(212);
    });

    it(`supports custom separators specified with a prefix`, () => {
      expect(add('//;\n2;3')).to.equal(5);
    });

    it(`supports custom separators and escapes them`, () => {
      expect(add('//*\n2*3')).to.equal(5);
    });

    it(`supports a mixture of separators`, () => {
      expect(add('//*\n2*3,4\n5')).to.equal(14);
    });
  });
});
