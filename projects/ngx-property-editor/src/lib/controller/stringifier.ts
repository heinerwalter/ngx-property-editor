import { $localize } from '@angular/localize/init';

export module Stringifier {

  // region Booleans

  /**
   * Converts a boolean value to a human-readable string.
   * @param value A boolean value. If undefined (or any other type but boolean), an empty string is returned.
   * @param type Choose how to display the boolean value:
   *             'true-false': true -> 'true'; false -> 'false'
   *             'yes-no':     true -> 'yes';  false -> 'no'
   */
  export function booleanToString(value: boolean | undefined,
                                  type: 'true-false' | 'yes-no' = 'yes-no'): string {
    if (typeof value !== 'boolean') return '';

    switch (type) {
      case 'true-false':
        return value ? $localize`:@@true:true` : $localize`:@@false:false`;
      case 'yes-no':
        return value ? $localize`:@@yes:Ja` : $localize`:@@no:Nein`;
    }

    return '';
  }

  // endregion

  // region Dates

  /**
   * Gets the month and year of the given date as string using the current locale.
   * @param date A Date.
   * @returns Month and year of the given date as string (e.g. 'January 2023')
   *          or an empty string, if the given date is undefined.
   */
  export function dateMonthAndYearToString(date: Date | undefined): string {
    return date?.toLocaleDateString(navigator.language, { year: 'numeric', month: 'long' }) || '';
  }

  /**
   * Gets a short date and/or time string of the given date using the current locale.
   * @param date A Date.
   * @param includeDate Include date in the result.
   * @param includeTime Include time in the result.
   *                    Use 'auto' to include the time, if any date component is different from zero.
   * @returns A string representation of the given date or an empty string, if `date` is undefined.
   */
  export function dateToString(date: Date | undefined,
                               includeDate: boolean = true,
                               includeTime: boolean | 'auto' = 'auto'): string {
    if (!date) return '';

    function includeTimeAuto(): boolean {
      return !!date &&
        (date.getHours() != 0 || date.getMinutes() != 0 || date.getSeconds() != 0 || date.getMilliseconds() != 0);
    }

    includeTime = includeTime == 'auto' ? includeTimeAuto() : includeTime;

    if (includeDate && !includeTime)
      return date.toLocaleDateString(navigator.language, { dateStyle: 'medium' });
    else if (!includeDate && includeTime)
      return date.toLocaleTimeString(navigator.language, { timeStyle: 'short' });
    else if (includeDate && includeTime)
      return date.toLocaleString(navigator.language, { dateStyle: 'medium', timeStyle: 'short' });
    return '';
  }

  /**
   * Gets a date string as used as file name prefixes (format: 'YYYY-MM-DD').
   * @param date A Date.
   */
  export function dateToStringForFileName(date: Date | undefined): string {
    if (!date) return '';
    const year: string = numberToPaddedString(date.getFullYear(), 4);
    const month: string = numberToPaddedString(date.getMonth() + 1, 2);
    const day: string = numberToPaddedString(date.getDate(), 2);
    return `${year}-${month}-${day}`;
  }

  // endregion

  // region Numbers

  /**
   * Returns the given number as padded string with a minimum length.
   *
   * This function works best for positive integers. When passing negative numbers
   * the minus is included in the `targetLength` and when passing decimal numbers
   * the decimal point and the decimal places are included in the `targetLength`.
   * @param value Convert this number to a padded string.
   * @param targetLength Minimum length of the returned string. If the number
   *                     is too short, zeros are added at the beginning.
   * @see String.prototype.padStart
   */
  export function numberToPaddedString(value: number, targetLength: number): string {
    let stringValue: string;
    let isNegative: boolean = false;
    if (isNaN(value)) {
      stringValue = '';
    } else {
      if (value < 0) {
        isNegative = true;
        targetLength--;
        value = Math.abs(value);
      }
      stringValue = value.toLocaleString(navigator.language, {
        useGrouping: false,
      });
    }

    // Pad string with zeros
    stringValue = stringValue.padStart(targetLength, '0');

    if (isNegative) stringValue = '-' + stringValue;

    return stringValue;
  }

  /**
   * Returns the given number as string formatted as currency with the given currency Symbol (if available).
   * @param amount Amount of a currency.
   * @param currency Optional: currency name or symbol (e.g. '€' or 'EUR').
   */
  export function numberWithCurrencyToString(amount: number | undefined, currency?: string): string {
    if (amount == undefined || isNaN(amount)) return '';

    const amountString: string = amount.toLocaleString(navigator.language, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    currency = currency?.trim().toUpperCase() || '';

    switch (currency) {
      case 'USD':
      case '$':
        return `${currency} ${amountString}`.trim();
      default:
        return `${amountString} ${currency}`.trim();
    }
  }

  /**
   * Converts an integer to words as it is spoken.
   * The remainder of a decimal number is ignored.
   * This function only supports the german language yet.
   * @param value An integer (up to 'Billiarden' = 1.000.000.000.000.000).
   * @returns The given number as words like '[minus] zweiundvierzig'.
   * @see numberToWordsWithUnitString
   */
  export function integerToWordsString(value: number): string {
    // In Anlehnung an eine Klassenprogrammierung von Hans W. Hofmann
    const oneToNineteen: string[] = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
    const tens: string[] = ['', 'zehn', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
    const thousandsAndMore: string[] = ['', 'tausend', 'millionen', 'milliarden', 'billionen', 'billiarden'];
    const thousandsAndMoreOne: string[] = ['eins', 'eintausend', 'einemillion', 'einemilliarde', 'einebillion', 'einebilliarde'];

    /** Converts the last three digits of a number to a word. */
    function lastThreeDigitsToWordsString(value: number): string {
      let result: string;
      const belowOneHundred: number = value % 100;
      if (belowOneHundred < 20) {
        result = oneToNineteen[belowOneHundred];
      } else {
        result = oneToNineteen[belowOneHundred % 10] + (belowOneHundred % 10 > 0 ? 'und' : '') + tens[Math.trunc(belowOneHundred / 10)];
      }
      const hundred: number = ((value % 1000) - belowOneHundred) / 100;
      if (hundred > 0) {
        result = oneToNineteen[hundred] + 'hundert' + result;
      }
      return result;
    }

    // Cut off decimal places
    value = Math.trunc(value);

    // Handle null
    if (value == 0) {
      return 'null';
    }

    // Handle negative values
    const isNegative: boolean = value < 0;
    value = Math.abs(value);

    let result: string = '';
    // Iterate over sections of three digits starting at the back (the least significant digit)
    let i: number = 0;
    while (value > 0) {
      const section: number = value % 1000;
      if (section == 1) {
        result = thousandsAndMoreOne[i] + result;
      } else if (section > 1) {
        result = lastThreeDigitsToWordsString(section) + thousandsAndMore[i] + result;
      }
      value = Math.trunc(value / 1000);
      i++;
    }

    // Add an 's' at the end, if the last digit is 1 (eins)
    if (result.endsWith('ein')) {
      result = result + 's';
    }

    // Add minus, if the number was negative
    if (isNegative) {
      result = 'minus ' + result;
    }

    return result;
  }

  /**
   * Converts the remainder of a number to words as it is spoken.
   * This function only supports the german language yet.
   * @param value A decimal number.
   * @param includeDecimalPlaces Include this amount of decimal places in the result (if 0, no decimal places are included).
   * @returns The remainder of the given number as words like 'null-eins-zwei'.
   * @see integerToWordsString
   * @see numberToWordsWithUnitString
   */
  export function decimalPlacesToWordsString(value: number, includeDecimalPlaces: number = 2): string {
    if (!value || includeDecimalPlaces <= 0) return '';

    // Round to includeDecimalPlaces
    const pow: number = Math.pow(10, includeDecimalPlaces);
    value = Math.round((value + Number.EPSILON) * pow) / pow;

    // Get string of decimal places
    let stringValue: string = value.toString();
    const commaIndex: number = stringValue.indexOf('.');
    if (commaIndex < 0) return '';
    stringValue = stringValue.substring(commaIndex + 1, commaIndex + 1 + includeDecimalPlaces);

    // Get separate digits of decimal places
    const digits: number[] = Array.from(stringValue).map(digit => parseInt(digit));
    // Remove trailing zeros
    while (digits.length && digits[digits.length - 1] == 0) {
      digits.pop();
    }
    if (!digits.length) return '';

    return digits
      // Convert separate digits to words
      .map(digit => integerToWordsString(digit))
      // Join digits by '-'
      .join('-');
  }

  /**
   * Converts a number to words as it is spoken.
   * In contrast to the function `integerToWordsString` this function converts decimal places, too.
   * This function only supports the german language yet.
   * @param value A number.
   * @param includeDecimalPlaces Include this amount of decimal places in the result (if 0, no decimal places are included).
   * @returns The given number as words like '[minus] zweiundvierzig komma null-eins-zwei'.
   * @see integerToWordsString
   * @see decimalPlacesToWordsString
   */
  export function numberToWordsString(value: number, includeDecimalPlaces: number = 2): string {
    const integerString: string = integerToWordsString(value);
    const decimalPlacesString: string = decimalPlacesToWordsString(value, includeDecimalPlaces);

    if (decimalPlacesString) {
      return `${integerString} komma ${decimalPlacesString}`;
    } else {
      return integerString;
    }
  }

  /**
   * Converts a number to words as it is spoken.
   * In contrast to the function `integerToWordsString` this function converts decimal places, too.
   * This function only supports the german language yet.
   * @param value A number.
   * @param includeDecimalPlaces Include this amount of decimal places in the result (if 0, no decimal places are included).
   * @param unit Add this string as unit after the integer part.
   * @param decimalUnit Add this string as unit after the decimal places (if any).
   * @returns The given number as words like '[minus] zweiundvierzig [{unit}] [einundzwanzig [{decimalUnit}]]'.
   * @see integerToWordsString
   */
  export function numberToWordsWithUnitString(value: number, includeDecimalPlaces: number = 2, unit?: string, decimalUnit?: string): string {
    const integer: number = Math.trunc(value);
    const decimalPlaces: number = Math.round((Math.abs(value) - Math.abs(integer)) * Math.pow(10, Math.max(includeDecimalPlaces, 0)));

    // Add space before units, if not empty
    unit = unit?.trim() || '';
    if (unit) unit = ' ' + unit;
    decimalUnit = decimalUnit?.trim() || '';
    if (decimalUnit) decimalUnit = ' ' + decimalUnit;

    if (decimalPlaces == 0) {
      return integerToWordsString(integer) + unit;
    } else {
      return integerToWordsString(integer) + unit + ' ' + integerToWordsString(decimalPlaces) + decimalUnit;
    }
  }

  /**
   * Converts an amount of euros to words as it is spoken.
   * This function only supports the german language yet.
   * @param value A currency number.
   * @returns The given number as words like '[minus] zweiundvierzig Euro [einundzwanzig Cent]'.
   * @see numberToWordsWithUnitString
   */
  export function euroToWordsString(value: number): string {
    return numberToWordsWithUnitString(value, 2, 'Euro', 'Cent');
  }

  // endregion

  // region Strings

  /**
   * Converts the given text to camel case (first character of each word as upper case;
   * everything else as lower case).
   * @param str Input string.
   * @param removeSpaces If true, all spaces are removed (e.g. 'camel case' -> 'CamelCase').
   * @returns The input string without spaces but in camel case (e.g. 'camel case' -> 'Camel Case').
   */
  export function stringToCamelCase(str: string, removeSpaces: boolean = false): string {
    if (!str) return str;
    const words: string[] = str.split(' ').filter(s => !!s);
    return words.map(word => word[0].toUpperCase() + word.substring(1).toLowerCase())
      .join(removeSpaces ? '' : ' ');
  }

  // endregion

  // region Arrays

  /**
   * Converts an array to a string.
   * @param array An array. If the given value is not an array, an empty string is returned.
   * @returns A string representation of the given array like '[item 1, item 2, item 3]'.
   */
  export function arrayToString(array: any[]): string {
    if (!Array.isArray(array)) return '';

    return `[${array.map(item => anyTypeToString(item)).join(', ')}]`;
  }

  // endregion

  // region Any Type

  /**
   * Converts any value to a string. If `Stringifier` contains a conversion function
   * for the given value type, it is used to convert the value to a string.
   * Otherwise, the default `toString()` function is used.
   * @param value Any value.
   * @returns A string representation of the given value.
   */
  export function anyTypeToString(value: any): string {
    if (value == undefined) {
      return '';
    }

    switch (typeof value) {
      case "boolean":
        return booleanToString(value);
      case "number":
        if (isNaN(value))
          return '';
        return value.toLocaleString();
      case "bigint":
        return value.toLocaleString();
      case "string":
        return value;
      case "function":
        return anyTypeToString(value());

      case "object":
        if (Array.isArray(value)) {
          return arrayToString(value);
        } else if (value instanceof Date) {
          return dateToString(value);
        }
        break;
    }

    return value.toString();
  }

  // endregion

}
