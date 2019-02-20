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

    it(`returns sum of three given integers, e.g. '10, 20, 30' returns 60`, () => {
      expect(StringCalculator.add('10,20,30')).to.equal(60);
    });

    it(`supports \\n as additional operator, e.g. '10\n2' returns 12`, () => {
      expect(StringCalculator.add('10\n2')).to.equal(12);
    });

    it(`supports custom separators specified with a prefix, e.g. '//;\\n1;2' returns 3`, () => {
      expect(StringCalculator.add('//;\n1;2')).to.equal(3);
    });

    it(`supports custom separators and escapes them, e.g. '//'\\n1*2' returns 3`, () => {
      expect(StringCalculator.add('//*\n1*2')).to.equal(3);
    });

    it(`supports a mix of custom separators, comma and newline`, () => {
      expect(StringCalculator.add('//*\n1*2\n3,5')).to.equal(11);
    });

    it(`throws an exception for a negative number`, () => {
      expect(() => StringCalculator.add('-1')).to.throw(
        /Negatives not allowed/
      );
    });
  });
});
