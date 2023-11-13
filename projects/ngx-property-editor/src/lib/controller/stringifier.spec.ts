import { Stringifier } from './stringifier';

describe('Stringifier', () => {

  // Use german locale for testing
  Object.defineProperty(navigator, 'language', {
    get: function (): string {
      return 'de';
    },
  });

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

  it('stringToCamelCase', () => {
    expect(Stringifier.stringToCamelCase('')).toEqual('');
    expect(Stringifier.stringToCamelCase(' ')).toEqual('');
    expect(Stringifier.stringToCamelCase('abc')).toEqual('Abc');
    expect(Stringifier.stringToCamelCase(' abc   ')).toEqual('Abc');
    expect(Stringifier.stringToCamelCase('Abc')).toEqual('Abc');
    expect(Stringifier.stringToCamelCase('My string with spaces')).toEqual('My String With Spaces');
    expect(Stringifier.stringToCamelCase('My string with spaces', false)).toEqual('My String With Spaces');
    expect(Stringifier.stringToCamelCase('My string with spaces', true)).toEqual('MyStringWithSpaces');
  });

  // endregion

  // region Arrays

  it('arrayToString', () => {
    expect(Stringifier.arrayToString(undefined as any)).toEqual('');
    expect(Stringifier.arrayToString({} as any)).toEqual('');
    expect(Stringifier.arrayToString([])).toEqual('[]');
    expect(Stringifier.arrayToString([1])).toEqual('[1]');
    expect(Stringifier.arrayToString([1, 'abc', -5, {}])).toEqual('[1, abc, -5, [object Object]]');
    expect(Stringifier.arrayToString([new Date(2023, 0, 1), true, 100, [1, 2, 3]])).toEqual('[01.01.2023, Ja, 100, [1, 2, 3]]');
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

    expect(Stringifier.anyTypeToString([])).toEqual('[]');
    expect(Stringifier.anyTypeToString([100])).toEqual('[100]');
    expect(Stringifier.anyTypeToString(['a', 'b', 'C'])).toEqual('[a, b, C]');

    expect(Stringifier.anyTypeToString({ anyObject: 'foo' })).toEqual('[object Object]');
  });

  // endregion

});
