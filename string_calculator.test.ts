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

    it(`returns sum of three given numbers separated by ','`, () => {
      expect(add('10,20,30')).to.equal(60);
    });

    it(`supports \\n as additional separator`, () => {
      expect(add('100\n200')).to.equal(300);
    });

    it(`supports a mix of separators`, () => {
      expect(add('100\n200,300')).to.equal(600);
    });

    it(`supports custom delimiters specified with a prefix`, () => {
      expect(add('//;\n1;2')).to.equal(3);
    });

    it(`supports custom delimiters and escapes them, e.g. '//*\\n1*2' yields 3`, () => {
      expect(add('//*\n1*2')).to.equal(3);
    });
  });
});
