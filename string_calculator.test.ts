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

    it(`supports custom delimiters and escapes them, e.g. '//*\\n1*2' yields 3`, () => {
      expect(StringCalculator.add('//*\n1*2')).to.equal(3);
    });

    it(`throws an exception for a negative number`, () => {
      expect(() => StringCalculator.add('-1')).to.throw(
        /Negatives not allowed/
      );
    });

    it(`lists negative numbers in the exception text`, () => {
      expect(() => StringCalculator.add('-1,5,-3,-10')).to.throw(
        'Negatives not allowed: -1,-3,-10'
      );
    });

    it(`ignores numbers greater 1000, e.g. '1001,2' returns 2`, () => {
      expect(StringCalculator.add('1001,2')).to.equal(2);
    });

    it(`supports custom delimiters with more than one character, e.g. '//sep\\n1sep2' yields 3`, () => {
      expect(StringCalculator.add('//sep\n1sep2')).to.equal(3);
    });
  });
});
