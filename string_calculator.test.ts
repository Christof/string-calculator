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

    it(`returns sum of two given integers separated by ','`, () => {
      expect(StringCalculator.add('2,3')).to.equal(5);
    });

    it(`returns sum of three given integers separated by ','`, () => {
      expect(StringCalculator.add('2,3,4')).to.equal(9);
    });

    it(`supports \n as additional separator`, () => {
      expect(StringCalculator.add('1,2\n4')).to.equal(7);
    });

    it(`supports custom delimiters specified with a prefix, e.g. '//;\\n1;2' yields 3`, () => {
      expect(StringCalculator.add('//;\n1;2')).to.equal(3);
    });
  });
});
