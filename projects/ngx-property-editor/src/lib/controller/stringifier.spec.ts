import { Stringifier } from './stringifier';


/**
 * Call this function within a unit test describe block to override the global langauge setting.
 * @param language A language (e.g. 'de').
 */
export function useLanguageForTesting(language: string = 'de'): void {
  Object.defineProperty(navigator, 'language', {
    get: function (): string {
      return language;
    },
  });
}


describe('Stringifier', () => {

  // Use german locale for testing
  useLanguageForTesting('de');

  // region Booleans

  it('booleanToString', () => {
    expect(Stringifier.booleanToString(true)).toEqual('Ja');
    expect(Stringifier.booleanToString(false)).toEqual('Nein');
    expect(Stringifier.booleanToString(undefined)).toEqual('');
    expect(Stringifier.booleanToString(true, 'true-false')).toEqual('true');
    expect(Stringifier.booleanToString(false, 'true-false')).toEqual('false');
    expect(Stringifier.booleanToString(undefined, 'true-false')).toEqual('');
    expect(Stringifier.booleanToString(true, 'yes-no')).toEqual('Ja');
    expect(Stringifier.booleanToString(false, 'yes-no')).toEqual('Nein');
    expect(Stringifier.booleanToString(undefined, 'yes-no')).toEqual('');

    expect(Stringifier.booleanToString(true, 'true-false', true)).toEqual('true');
    expect(Stringifier.booleanToString(false, 'true-false', true)).toEqual('false');
    expect(Stringifier.booleanToString(undefined, 'true-false', true)).toEqual('Unbestimmt');
  });

  it('stringToBoolean', () => {
    expect(Stringifier.stringToBoolean('true')).toEqual(true);
    expect(Stringifier.stringToBoolean('yes')).toEqual(true);
    expect(Stringifier.stringToBoolean('1')).toEqual(true);
    expect(Stringifier.stringToBoolean('ja')).toEqual(true);
    expect(Stringifier.stringToBoolean('Ja')).toEqual(true);
    expect(Stringifier.stringToBoolean('trUe')).toEqual(true);
    expect(Stringifier.stringToBoolean(' true   ')).toEqual(true);

    expect(Stringifier.stringToBoolean('false')).toEqual(false);
    expect(Stringifier.stringToBoolean('no')).toEqual(false);
    expect(Stringifier.stringToBoolean('nein')).toEqual(false);
    expect(Stringifier.stringToBoolean('')).toEqual(false);
    expect(Stringifier.stringToBoolean(undefined)).toEqual(false);
    expect(Stringifier.stringToBoolean('foo')).toEqual(false);
  });

  // endregion

  // region Dates

  it('dateMonthAndYearToString', () => {
    expect(Stringifier.dateMonthAndYearToString(undefined)).toEqual('');
    expect(Stringifier.dateMonthAndYearToString(new Date(2023, 0, 16, 10, 15, 30))).toEqual('Januar 2023');
    expect(Stringifier.dateMonthAndYearToString(new Date(2020, 11, 17))).toEqual('Dezember 2020');
  });

  it('dateToString', () => {
    expect(Stringifier.dateToString(undefined)).toEqual('');
    expect(Stringifier.dateToString(new Date(2023, 0, 1, 10, 20, 0), true, false)).toEqual('01.01.2023');
    expect(Stringifier.dateToString(new Date(2023, 0, 1, 10, 20, 0), true, true)).toEqual('01.01.2023, 10:20');
    expect(Stringifier.dateToString(new Date(2023, 0, 1, 10, 20, 0), true, 'auto')).toEqual('01.01.2023, 10:20');
    expect(Stringifier.dateToString(new Date(2023, 0, 1, 10, 20, 0), false, false)).toEqual('');
    expect(Stringifier.dateToString(new Date(2023, 0, 1, 10, 20, 0), false, true)).toEqual('10:20');
    expect(Stringifier.dateToString(new Date(2023, 0, 1, 10, 20, 0), false, 'auto')).toEqual('10:20');
    expect(Stringifier.dateToString(new Date(2023, 11, 17), true, false)).toEqual('17.12.2023');
    expect(Stringifier.dateToString(new Date(2023, 11, 17), true, true)).toEqual('17.12.2023, 00:00');
    expect(Stringifier.dateToString(new Date(2023, 11, 17), true, 'auto')).toEqual('17.12.2023');
    expect(Stringifier.dateToString(new Date(2023, 11, 17), false, false)).toEqual('');
    expect(Stringifier.dateToString(new Date(2023, 11, 17), false, true)).toEqual('00:00');
    expect(Stringifier.dateToString(new Date(2023, 11, 17), false, 'auto')).toEqual('');
  });

  it('dateToStringForFileName', () => {
    expect(Stringifier.dateToStringForFileName(undefined)).toEqual('');
    expect(Stringifier.dateToStringForFileName(new Date(2023, 4, 5, 10, 46))).toEqual('2023-05-05');
    expect(Stringifier.dateToStringForFileName(new Date(100, 10, 12, 10, 46))).toEqual('0100-11-12');
  });

  // endregion

  // region Numbers

  it('numberToString', () => {
    expect(Stringifier.numberToString(undefined)).toEqual('');
    expect(Stringifier.numberToString(NaN)).toEqual('');
    expect(Stringifier.numberToString('skjhd' as any)).toEqual('');
    expect(Stringifier.numberToString({} as any)).toEqual('');

    expect(Stringifier.numberToString(0)).toEqual('0');
    expect(Stringifier.numberToString(1)).toEqual('1');
    expect(Stringifier.numberToString(42)).toEqual('42');
    expect(Stringifier.numberToString(-11)).toEqual('-11');

    expect(Stringifier.numberToString(10245893)).toEqual('10.245.893');
    expect(Stringifier.numberToString(10245893, true)).toEqual('10.245.893');
    expect(Stringifier.numberToString(10245893, false)).toEqual('10245893');

    expect(Stringifier.numberToString(BigInt(12))).toEqual('12');
    expect(Stringifier.numberToString(BigInt('12345678901234567890'))).toEqual(BigInt('12345678901234567890').toLocaleString());
  });

  it('numberToPaddedString', () => {
    expect(Stringifier.numberToPaddedString(1, 4)).toEqual('0001');
    expect(Stringifier.numberToPaddedString(42, 0)).toEqual('42');
    expect(Stringifier.numberToPaddedString(11.11, 7)).toEqual('0011,11');
    expect(Stringifier.numberToPaddedString(-11, 7)).toEqual('-000011');
    expect(Stringifier.numberToPaddedString(-11.11, 7)).toEqual('-011,11');
  });

  it('numberWithCurrencyToString', () => {
    expect(Stringifier.numberWithCurrencyToString(undefined, '€')).toEqual('');
    expect(Stringifier.numberWithCurrencyToString(NaN, '€')).toEqual('');
    expect(Stringifier.numberWithCurrencyToString(42.58, '€')).toEqual('42,58 €');
    expect(Stringifier.numberWithCurrencyToString(42.42, undefined)).toEqual('42,42');
    expect(Stringifier.numberWithCurrencyToString(-42.1111, 'EUR')).toEqual('-42,11 EUR');
    expect(Stringifier.numberWithCurrencyToString(11, '$')).toEqual('$ 11,00');
    expect(Stringifier.numberWithCurrencyToString(-11.1, 'USD')).toEqual('USD -11,10');
  });

  it('integerToWordsString', () => {
    expect(Stringifier.integerToWordsString(0)).toEqual('null');
    expect(Stringifier.integerToWordsString(-0)).toEqual('null');
    expect(Stringifier.integerToWordsString(1)).toEqual('eins');
    expect(Stringifier.integerToWordsString(42)).toEqual('zweiundvierzig');
    expect(Stringifier.integerToWordsString(-42)).toEqual('minus zweiundvierzig');
    expect(Stringifier.integerToWordsString(42.123)).toEqual('zweiundvierzig');
    expect(Stringifier.integerToWordsString(-42.123)).toEqual('minus zweiundvierzig');

    expect(Stringifier.integerToWordsString(112042)).toEqual('einhundertzwölftausendzweiundvierzig');
    expect(Stringifier.integerToWordsString(123410205100)).toEqual('einhundertdreiundzwanzigmilliardenvierhundertzehnmillionenzweihundertfünftausendeinhundert');
    expect(Stringifier.integerToWordsString(1005123410205100)).toEqual('einebilliardefünfbillioneneinhundertdreiundzwanzigmilliardenvierhundertzehnmillionenzweihundertfünftausendeinhundert');
  });

  it('decimalPlacesToWordsString', () => {
    expect(Stringifier.decimalPlacesToWordsString(0)).toEqual('');
    expect(Stringifier.decimalPlacesToWordsString(-0)).toEqual('');
    expect(Stringifier.decimalPlacesToWordsString(1.0019, 2)).toEqual('');
    expect(Stringifier.decimalPlacesToWordsString(1.123456, 0)).toEqual('');
    expect(Stringifier.decimalPlacesToWordsString(1.123456, -10)).toEqual('');
    expect(Stringifier.decimalPlacesToWordsString(1.123456)).toEqual('eins-zwei');
    expect(Stringifier.decimalPlacesToWordsString(1.123456, 2)).toEqual('eins-zwei');
    expect(Stringifier.decimalPlacesToWordsString(1.123456, 10)).toEqual('eins-zwei-drei-vier-fünf-sechs');
    expect(Stringifier.decimalPlacesToWordsString(1.00700, 10)).toEqual('null-null-sieben');
  });

  it('numberToWordsString', () => {
    expect(Stringifier.numberToWordsString(0, 2)).toEqual('null');
    expect(Stringifier.numberToWordsString(-0, 2)).toEqual('null');
    expect(Stringifier.numberToWordsString(1, 2)).toEqual('eins');
    expect(Stringifier.numberToWordsString(42, 2)).toEqual('zweiundvierzig');
    expect(Stringifier.numberToWordsString(-42, 2)).toEqual('minus zweiundvierzig');
    expect(Stringifier.numberToWordsString(42.121, 2)).toEqual('zweiundvierzig komma eins-zwei');
    expect(Stringifier.numberToWordsString(-42.121, 2)).toEqual('minus zweiundvierzig komma eins-zwei');
    expect(Stringifier.numberToWordsString(42.129, 2)).toEqual('zweiundvierzig komma eins-drei');
    expect(Stringifier.numberToWordsString(-42.129, 2)).toEqual('minus zweiundvierzig komma eins-drei');
    expect(Stringifier.numberToWordsString(42.012, 10)).toEqual('zweiundvierzig komma null-eins-zwei');
    expect(Stringifier.numberToWordsString(-42.012, 10)).toEqual('minus zweiundvierzig komma null-eins-zwei');
  });

  it('numberToWordsWithUnitString', () => {
    expect(Stringifier.numberToWordsWithUnitString(0, 2)).toEqual('null');
    expect(Stringifier.numberToWordsWithUnitString(-0, 2)).toEqual('null');
    expect(Stringifier.numberToWordsWithUnitString(1, 2)).toEqual('eins');
    expect(Stringifier.numberToWordsWithUnitString(42, 2)).toEqual('zweiundvierzig');
    expect(Stringifier.numberToWordsWithUnitString(-42, 2)).toEqual('minus zweiundvierzig');
    expect(Stringifier.numberToWordsWithUnitString(42.129, 2)).toEqual('zweiundvierzig dreizehn');
    expect(Stringifier.numberToWordsWithUnitString(-42.129, 2)).toEqual('minus zweiundvierzig dreizehn');
    expect(Stringifier.numberToWordsWithUnitString(42.129, 3)).toEqual('zweiundvierzig einhundertneunundzwanzig');
    expect(Stringifier.numberToWordsWithUnitString(-42.129, 3)).toEqual('minus zweiundvierzig einhundertneunundzwanzig');

    expect(Stringifier.numberToWordsWithUnitString(42.123, 2, 'Einheit')).toEqual('zweiundvierzig Einheit zwölf');
    expect(Stringifier.numberToWordsWithUnitString(-42.123, 2, 'Einheit')).toEqual('minus zweiundvierzig Einheit zwölf');
    expect(Stringifier.numberToWordsWithUnitString(42.123, 2, 'Einheit', 'Dezimaleinheit')).toEqual('zweiundvierzig Einheit zwölf Dezimaleinheit');
    expect(Stringifier.numberToWordsWithUnitString(-42.123, 2, 'Einheit', 'Dezimaleinheit')).toEqual('minus zweiundvierzig Einheit zwölf Dezimaleinheit');
    expect(Stringifier.numberToWordsWithUnitString(42, 2, 'Einheit', 'Dezimaleinheit')).toEqual('zweiundvierzig Einheit');
    expect(Stringifier.numberToWordsWithUnitString(-42, 2, 'Einheit', 'Dezimaleinheit')).toEqual('minus zweiundvierzig Einheit');
  });

  it('euroToWordsString', () => {
    expect(Stringifier.euroToWordsString(0)).toEqual('null Euro');
    expect(Stringifier.euroToWordsString(-0)).toEqual('null Euro');
    expect(Stringifier.euroToWordsString(42)).toEqual('zweiundvierzig Euro');
    expect(Stringifier.euroToWordsString(-42)).toEqual('minus zweiundvierzig Euro');
    expect(Stringifier.euroToWordsString(42.12)).toEqual('zweiundvierzig Euro zwölf Cent');
    expect(Stringifier.euroToWordsString(-42.12)).toEqual('minus zweiundvierzig Euro zwölf Cent');
    expect(Stringifier.euroToWordsString(42.129)).toEqual('zweiundvierzig Euro dreizehn Cent');
    expect(Stringifier.euroToWordsString(-42.129)).toEqual('minus zweiundvierzig Euro dreizehn Cent');
  });

  // endregion

  // region Strings

  it('stringToFirstCharacterLowerCase', () => {
    // @ts-ignore
    expect(Stringifier.stringToFirstCharacterLowerCase(undefined)).toBeUndefined();
    expect(Stringifier.stringToFirstCharacterLowerCase('')).toEqual('');
    expect(Stringifier.stringToFirstCharacterLowerCase(' ')).toEqual('');
    expect(Stringifier.stringToFirstCharacterLowerCase('abc')).toEqual('abc');
    expect(Stringifier.stringToFirstCharacterLowerCase(' abc   ')).toEqual('abc');
    expect(Stringifier.stringToFirstCharacterLowerCase('Abc')).toEqual('abc');
    expect(Stringifier.stringToFirstCharacterLowerCase('   Abc')).toEqual('abc');
    expect(Stringifier.stringToFirstCharacterLowerCase('myStringWithoutSpaces')).toEqual('myStringWithoutSpaces');
    expect(Stringifier.stringToFirstCharacterLowerCase('my string with spaces')).toEqual('my string with spaces');
    expect(Stringifier.stringToFirstCharacterLowerCase('MyStringWithoutSpaces')).toEqual('myStringWithoutSpaces');
    expect(Stringifier.stringToFirstCharacterLowerCase('My string with spaces')).toEqual('my string with spaces');
  });

  it('stringToFirstCharacterUpperCase', () => {
    // @ts-ignore
    expect(Stringifier.stringToFirstCharacterUpperCase(undefined)).toBeUndefined();
    expect(Stringifier.stringToFirstCharacterUpperCase('')).toEqual('');
    expect(Stringifier.stringToFirstCharacterUpperCase(' ')).toEqual('');
    expect(Stringifier.stringToFirstCharacterUpperCase('abc')).toEqual('Abc');
    expect(Stringifier.stringToFirstCharacterUpperCase(' abc   ')).toEqual('Abc');
    expect(Stringifier.stringToFirstCharacterUpperCase('Abc')).toEqual('Abc');
    expect(Stringifier.stringToFirstCharacterUpperCase('   Abc')).toEqual('Abc');
    expect(Stringifier.stringToFirstCharacterUpperCase('myStringWithoutSpaces')).toEqual('MyStringWithoutSpaces');
    expect(Stringifier.stringToFirstCharacterUpperCase('my string with spaces')).toEqual('My string with spaces');
    expect(Stringifier.stringToFirstCharacterUpperCase('MyStringWithoutSpaces')).toEqual('MyStringWithoutSpaces');
    expect(Stringifier.stringToFirstCharacterUpperCase('My string with spaces')).toEqual('My string with spaces');
  });

  it('stringToCamelCase', () => {
    // @ts-ignore
    expect(Stringifier.stringToCamelCase(undefined)).toBeUndefined();
    expect(Stringifier.stringToCamelCase('')).toEqual('');
    expect(Stringifier.stringToCamelCase(' ')).toEqual('');
    expect(Stringifier.stringToCamelCase('abc')).toEqual('Abc');
    expect(Stringifier.stringToCamelCase(' abc   ')).toEqual('Abc');
    expect(Stringifier.stringToCamelCase('Abc')).toEqual('Abc');
    expect(Stringifier.stringToCamelCase('My string with spaces')).toEqual('My String With Spaces');
    expect(Stringifier.stringToCamelCase('My string with spaces', false)).toEqual('My String With Spaces');
    expect(Stringifier.stringToCamelCase('My string with spaces', true)).toEqual('MyStringWithSpaces');
  });

  it('stringFromCamelCase', () => {
    // @ts-ignore
    expect(Stringifier.stringFromCamelCase(undefined)).toBeUndefined();
    expect(Stringifier.stringFromCamelCase('')).toEqual('');
    expect(Stringifier.stringFromCamelCase(' ')).toEqual('');
    expect(Stringifier.stringFromCamelCase('abc')).toEqual('abc');
    expect(Stringifier.stringFromCamelCase(' abc   ')).toEqual('abc');
    expect(Stringifier.stringFromCamelCase(' abC   ')).toEqual('ab c');
    expect(Stringifier.stringFromCamelCase(' Abc   ')).toEqual('abc');
    expect(Stringifier.stringFromCamelCase('Abc')).toEqual('abc');
    expect(Stringifier.stringFromCamelCase('MyStringWithCamelCase')).toEqual('my string with camel case');
    expect(Stringifier.stringFromCamelCase('myStringWithCamelCase')).toEqual('my string with camel case');
    expect(Stringifier.stringFromCamelCase('MyString with CamelCase')).toEqual('my string with camel case');
    expect(Stringifier.stringFromCamelCase('MyStringWithCAMELCase')).toEqual('my string with c a m e l case');
    expect(Stringifier.stringFromCamelCase('MyStringWith  C     amelCase')).toEqual('my string with c amel case');
  });

  it('passwordToMaskedString', () => {
    // @ts-ignore
    expect(Stringifier.passwordToMaskedString(undefined)).toEqual('');
    expect(Stringifier.passwordToMaskedString('')).toEqual('');
    expect(Stringifier.passwordToMaskedString(' ')).toEqual('*');
    expect(Stringifier.passwordToMaskedString('abc')).toEqual('***');
    expect(Stringifier.passwordToMaskedString(' abc   ')).toEqual('*******');
  });

  it('stringJoinAnd', () => {
    expect(Stringifier.stringJoinAnd()).toEqual('');
    expect(Stringifier.stringJoinAnd('')).toEqual('');
    expect(Stringifier.stringJoinAnd('aaa')).toEqual('aaa');
    expect(Stringifier.stringJoinAnd('aaa', 'bbb')).toEqual('aaa und bbb');
    expect(Stringifier.stringJoinAnd('aaa', 'bbb', 'ccc')).toEqual('aaa, bbb und ccc');
    expect(Stringifier.stringJoinAnd('aaa', 'bbb', 'ccc', 'd dd')).toEqual('aaa, bbb, ccc und d dd');
    expect(Stringifier.stringJoinAnd(...['aaa', 'bbb', 'ccc'])).toEqual('aaa, bbb und ccc');
  });

  // endregion

  // region Arrays

  it('arrayToString', () => {
    expect(Stringifier.arrayToString(undefined as any)).toEqual('');
    expect(Stringifier.arrayToString({} as any)).toEqual('');
    expect(Stringifier.arrayToString({ test: 'object' } as any)).toEqual('');

    expect(Stringifier.arrayToString([])).toEqual('');
    expect(Stringifier.arrayToString([1])).toEqual('1');
    expect(Stringifier.arrayToString([1, 2, 3])).toEqual('1, 2, 3');
    expect(Stringifier.arrayToString([1, 'abc', -5, {}])).toEqual('1, abc, -5, {}');
    expect(Stringifier.arrayToString([new Date(2023, 0, 1), true, 100, [1, 2, 3]])).toEqual('01.01.2023, Ja, 100, [1, 2, 3]');

    expect(Stringifier.arrayToString([], false)).toEqual('');
    expect(Stringifier.arrayToString([], true)).toEqual('[]');
    expect(Stringifier.arrayToString([1], true)).toEqual('[1]');
    expect(Stringifier.arrayToString([1, 2, 3], true)).toEqual('[1, 2, 3]');
    expect(Stringifier.arrayToString([1, 'abc', -5, {}], true)).toEqual('[1, abc, -5, {}]');
    expect(Stringifier.arrayToString([new Date(2023, 0, 1), true, 100, [1, 2, 3]], true)).toEqual('[01.01.2023, Ja, 100, [1, 2, 3]]');

    expect(Stringifier.arrayToString([], false, true)).toEqual('');
    expect(Stringifier.arrayToString([], true, true)).toEqual('[]');
    expect(Stringifier.arrayToString([1], false, true)).toEqual('1');
    expect(Stringifier.arrayToString([1], true, true)).toEqual('[\n  1\n]');
    expect(Stringifier.arrayToString([1, 2, 3], false, true)).toEqual('1,\n2,\n3');
    expect(Stringifier.arrayToString([1, 2, 3], true, true)).toEqual('[\n  1,\n  2,\n  3\n]');
    expect(Stringifier.arrayToString([1, [2, 3], 4], true, true)).toEqual('[\n  1,\n  [\n    2,\n    3\n  ],\n  4\n]');
  });

  // endregion

  // region Objects

  it('objectToDefaultString', () => {
    expect(Stringifier.objectToDefaultString(undefined)).toEqual('[object Undefined]');
    expect(Stringifier.objectToDefaultString(null)).toEqual('[object Null]');
    expect(Stringifier.objectToDefaultString({})).toEqual('[object Object]');
    expect(Stringifier.objectToDefaultString(new Object())).toEqual('[object Object]');
    expect(Stringifier.objectToDefaultString({ test: 123, string: 'foo' })).toEqual('[object Object]');

    expect(Stringifier.objectToDefaultString({}, false)).toEqual('[object Object]');
    expect(() => Stringifier.objectToDefaultString({}, true))
      .toThrowError('No custom toString function exists.');

    class TestObject {
      property: string;

      constructor(property: string) {
        this.property = property;
      }

      toString(): string {
        return `Custom toString function: ${this.property}`;
      }
    }

    expect(Stringifier.objectToDefaultString(new TestObject('foo'))).toEqual('Custom toString function: foo');
    expect(Stringifier.objectToDefaultString(new TestObject('foo'), false)).toEqual('Custom toString function: foo');
    expect(Stringifier.objectToDefaultString(new TestObject('foo'), true)).toEqual('Custom toString function: foo');
  });

  it('objectToString', () => {
    expect(Stringifier.objectToString(undefined)).toEqual('[object Undefined]');
    expect(Stringifier.objectToString(null)).toEqual('null');
    expect(Stringifier.objectToString({})).toEqual('{}');
    expect(Stringifier.objectToString(new Object())).toEqual('{}');
    expect(Stringifier.objectToString({ test: 123, string: 'foo' })).toEqual('{"test":123,"string":"foo"}');

    expect(Stringifier.objectToString({ test: 123, string: 'foo' }, false)).toEqual('{"test":123,"string":"foo"}');
    expect(Stringifier.objectToString({
      test: 123,
      string: 'foo',
    }, true)).toEqual('{\n  "test": 123,\n  "string": "foo"\n}');

    expect(Stringifier.objectToString({ undefinedProperty: undefined })).toEqual('{}');
    expect(Stringifier.objectToString({ undefinedProperty: undefined }, false, false)).toEqual('{}');
    expect(Stringifier.objectToString({ undefinedProperty: undefined }, false, true)).toEqual('{"undefinedProperty":null}');

    class TestObject {
      property: string;

      constructor(property: string) {
        this.property = property;
      }

      toString(): string {
        return `Custom toString function: ${this.property}`;
      }
    }

    expect(Stringifier.objectToString(new TestObject('foo'))).toEqual('Custom toString function: foo');
  });

  it('objectToPrettyString', () => {
    expect(Stringifier.objectToPrettyString(undefined)).toEqual('');
    expect(Stringifier.objectToPrettyString(null)).toEqual('');
    expect(Stringifier.objectToPrettyString({})).toEqual('');
    expect(Stringifier.objectToPrettyString(new Object())).toEqual('');
    expect(Stringifier.objectToPrettyString({ test: 123, string: 'foo' })).toEqual('test: 123, string: foo');
    expect(Stringifier.objectToPrettyString({ test: 123, string: ' foo   ' })).toEqual('test: 123, string: foo');

    expect(Stringifier.objectToPrettyString({ test: 123, string: 'foo' }, false)).toEqual('test: 123, string: foo');
    expect(Stringifier.objectToPrettyString({ test: 123, string: 'foo' }, true)).toEqual('test: 123,\nstring: foo');

    expect(Stringifier.objectToPrettyString({ undefinedProperty: undefined })).toEqual('');
    expect(Stringifier.objectToPrettyString({ undefinedProperty: undefined }, false, false)).toEqual('');
    expect(Stringifier.objectToPrettyString({ undefinedProperty: undefined }, false, true)).toEqual('undefinedProperty:');

    class TestObject {
      property: string;

      constructor(property: string) {
        this.property = property;
      }

      toString(): string {
        return `Custom toString function: ${this.property}`;
      }
    }

    expect(Stringifier.objectToPrettyString(new TestObject('foo'))).toEqual('Custom toString function: foo');
  });

  // endregion

  // region Any Type

  it('anyTypeToString', () => {
    expect(Stringifier.anyTypeToString(undefined)).toEqual('');
    expect(Stringifier.anyTypeToString(null)).toEqual('');

    expect(Stringifier.anyTypeToString(true)).toEqual('Ja');
    expect(Stringifier.anyTypeToString(false)).toEqual('Nein');

    expect(Stringifier.anyTypeToString(42000)).toEqual((42000).toLocaleString());
    expect(Stringifier.anyTypeToString(0.1)).toEqual((0.1).toLocaleString());
    expect(Stringifier.anyTypeToString(NaN)).toEqual('');

    expect(Stringifier.anyTypeToString(BigInt(9007199254740991))).toEqual(BigInt(9007199254740991).toLocaleString());

    expect(Stringifier.anyTypeToString('Just a string')).toEqual('Just a string');
    expect(Stringifier.anyTypeToString('')).toEqual('');

    expect(Stringifier.anyTypeToString(() => true)).toEqual('Ja');
    expect(Stringifier.anyTypeToString(() => 42)).toEqual('42');
    expect(Stringifier.anyTypeToString(() => 'My string')).toEqual('My string');
    expect(Stringifier.anyTypeToString(() => new Date(2023, 10, 10))).toEqual('10.11.2023');
    expect(Stringifier.anyTypeToString((param: number) => param)).toEqual('');

    expect(Stringifier.anyTypeToString(new Date(2023, 0, 1))).toEqual('01.01.2023');
    expect(Stringifier.anyTypeToString(new Date(2023, 11, 31, 10, 11, 12))).toEqual('31.12.2023, 10:11');
    expect(Stringifier.anyTypeToString(new Date(100, 10, 10))).toEqual('10.11.100');

    expect(Stringifier.anyTypeToString(new File([], 'filename.txt'))).toEqual('filename.txt');

    expect(Stringifier.anyTypeToString([])).toEqual('');
    expect(Stringifier.anyTypeToString([], true)).toEqual('[]');
    expect(Stringifier.anyTypeToString([100])).toEqual('100');
    expect(Stringifier.anyTypeToString(['a', 'b', 'C'])).toEqual('a, b, C');
    expect(Stringifier.anyTypeToString(['a', 'b', 'C'], false)).toEqual('a, b, C');
    expect(Stringifier.anyTypeToString(['a', 'b', 'C'], true)).toEqual('[a, b, C]');
    expect(Stringifier.anyTypeToString(['a', 'b', ['c', 'd', 'e']], false)).toEqual('a, b, [c, d, e]');
    expect(Stringifier.anyTypeToString(['a', 'b', ['c', 'd', 'e']], true)).toEqual('[a, b, [c, d, e]]');
    expect(Stringifier.anyTypeToString([1, 2, 3], false, false)).toEqual('1, 2, 3');
    expect(Stringifier.anyTypeToString([1, 2, 3], false, true)).toEqual('1,\n2,\n3');
    expect(Stringifier.anyTypeToString([1, 2, 3], true, true)).toEqual('[\n  1,\n  2,\n  3\n]');
    expect(Stringifier.anyTypeToString([1, [2, 3], 4], true, true)).toEqual('[\n  1,\n  [\n    2,\n    3\n  ],\n  4\n]');

    expect(Stringifier.anyTypeToString({})).toEqual('');
    expect(Stringifier.anyTypeToString({}, false)).toEqual('');
    expect(Stringifier.anyTypeToString({}, true)).toEqual('{}');
    const obj = { str: 'foo', num: 5 };
    expect(Stringifier.anyTypeToString(obj)).toEqual('str: foo, num: 5');
    expect(Stringifier.anyTypeToString(obj, false)).toEqual('str: foo, num: 5');
    expect(Stringifier.anyTypeToString(obj, false, false)).toEqual('str: foo, num: 5');
    expect(Stringifier.anyTypeToString(obj, false, true)).toEqual('str: foo,\nnum: 5');
    expect(Stringifier.anyTypeToString(obj, true)).toEqual('{"str":"foo","num":5}');
    expect(Stringifier.anyTypeToString(obj, true, false)).toEqual('{"str":"foo","num":5}');
    expect(Stringifier.anyTypeToString(obj, true, true)).toEqual('{\n  "str": "foo",\n  "num": 5\n}');
    const objUndefined = { undefinedProperty: undefined };
    expect(Stringifier.anyTypeToString(objUndefined)).toEqual('');
    expect(Stringifier.anyTypeToString(objUndefined, false, false, false)).toEqual('');
    expect(Stringifier.anyTypeToString(objUndefined, false, false, true)).toEqual('undefinedProperty:');
    expect(Stringifier.anyTypeToString(objUndefined, true, false, false)).toEqual('{}');
    expect(Stringifier.anyTypeToString(objUndefined, true, false, true)).toEqual('{"undefinedProperty":null}');
  });

  it('propertyTypeToString', () => {
    // TODO: Implement unit tests
  });

  // endregion

});
