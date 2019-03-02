import { add } from '../string_calculator';

describe(`StringCalculator`, () => {
  describe(`add`, () => {
    it(`returns 0 for empty string`, () => {
      expect(add('')).toEqual(0);
    });

    it(`returns a parsed number`, () => {
      expect(add('9')).toEqual(9);
    });

    it(`returns the sum of two numbers separated by ','`, () => {
      expect(add('9,98')).toEqual(107);
    });

    it(`returns the sum of three numbers`, () => {
      expect(add('9,98,3')).toEqual(110);
    });

    it(`supports new line as additional separator`, () => {
      expect(add('9\n98\n3')).toEqual(110);
    });

    it(`supports custom separators specified with a special prefix, e.g. '//;\\n1;2' returns 3`, () => {
      expect(add('//;\n1;2')).toEqual(3);
    });

    it(`supports mixture of all separators`, () => {
      expect(add('//;\n1;2,3\n4')).toEqual(10);
    });

    it(`escapes separators in regex to support all characters`, () => {
      expect(add('//*\n1*2')).toEqual(3);
    });
  });
});
