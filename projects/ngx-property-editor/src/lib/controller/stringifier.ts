'use strict';

import { PropertyType } from '../components/property-views/property-type';
import {
  PropertyTypeController
} from '../components/property-views/controller/property-type-controller';

/**
 * This module provides utility functions to convert
 * values of various types to strings.
 */
export namespace Stringifier {

  // region Booleans

  // Localized human-readable string representations of boolean values used by the function booleanToString:
  // TODO: $localize does not work in the library
  const localizedBooleanTrue: string = 'true'; // $localize`:@@true:true`;
  const localizedBooleanFalse: string = 'false'; // $localize`:@@false:false`;
  const localizedBooleanYes: string = 'Ja'; // $localize`:@@yes:Ja`;
  const localizedBooleanNo: string = 'Nein'; // $localize`:@@no:Nein`;
  const localizedBooleanIndeterminate: string = 'Unbestimmt'; // $localize`:@@indeterminate:Unbestimmt`;

  /**
   * Converts a boolean value to a human-readable string.
   * @param value A boolean value. If undefined (or any other type but boolean), an empty string is returned.
   * @param type Choose how to display the boolean value:
   *             'true-false': true -> 'true'; false -> 'false'
   *             'yes-no':     true -> 'yes';  false -> 'no'
   * @param includeIndeterminate If true and the value is undefined, 'indeterminate' is returned.
   */
  export function booleanToString(value: boolean | undefined,
                                  type: 'true-false' | 'yes-no' = 'yes-no',
                                  includeIndeterminate: boolean = false): string {
    if (includeIndeterminate && value == undefined)
      return localizedBooleanIndeterminate;
    if (typeof value !== 'boolean') return '';

    switch (type) {
      case 'true-false':
        return value ? localizedBooleanTrue : localizedBooleanFalse;
      case 'yes-no':
      default:
        return value ? localizedBooleanYes : localizedBooleanNo;
    }
  }

  /**
   * Converts a string value to a boolean.
   * @param value A string value which hopefully represents a boolean.
   *              Some examples of strings which are evaluated to true:
   *              'true', 'yes', '1' or localized versions of it.
   *              Everything else is evaluated to false.
   */
  export function stringToBoolean(value: string | undefined): boolean {
    if (!value) return false;

    switch (value.toString().trim().toLowerCase()) {
      case 'true':
      case 'yes':
      case '1':
      case localizedBooleanTrue.toLowerCase():
      case localizedBooleanYes.toLowerCase():
        return true;
    }
    return false;
  }

  // endregion

  // region Dates

  /**
   * Converts the given date so that the UTC timestamp of the given date
   * becomes the local timezone timestamp of the returned date.
   *
   * Example:
   * When a date is selected with the HTML date input in the middle european timezone (MET),
   * it is created without time (00:00) in the UTC timezone like:
   * ```
   * 2023-01-01, 00:00 (UTC)
   * ```
   * When this date instance is converted to string however, it is converted to the local timezone like:
   * ```
   * 2023-01-01, 01:00 (MET)
   * ```
   * This function converts the UTC date to the local timezone like:
   * ```
   * 2023-01-01, 00:00 (UTC) -> 2023-01-01, 00:00 (MET) == 2022-12-31, 23:00 (UTC)
   * ```
   */
  export function dateUTCToTimezone(date: Date): Date {
    const timeDiff: number = date.getTimezoneOffset() * 60000;
    return new Date(date.valueOf() + timeDiff);
  }

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
   * @param timezone Stringify date with UTC or local timezone? Default: UTC.
   * @returns A string representation of the given date or an empty string, if `date` is undefined.
   */
  export function dateToString(date: Date | undefined,
                               includeDate: boolean = true,
                               includeTime: boolean | 'auto' = 'auto',
                               timezone: 'utc' | 'local' = 'utc'): string {
    if (!date) return '';

    // If the date should be stringified as UTC, the local date is faked to represent the UTC date
    if (timezone == 'utc') {
      const localTimezoneOffset: number = date.getTimezoneOffset() * 60000;
      date = new Date(date.valueOf() + localTimezoneOffset);
    }

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
   * Returns the given number as locale string.
   * @param value Convert this number to a string.
   * @param useGrouping Should the returned string contain thousands separators?
   *                    Use undefined for default.
   */
  export function numberToString(value: number | bigint | undefined,
                                 useGrouping: boolean | undefined = undefined): string {
    if ((typeof value !== 'number' && typeof value !== 'bigint') ||
      (typeof value === 'number' && isNaN(value)))
      return '';
    return value.toLocaleString(navigator.language, { useGrouping: useGrouping });
  }

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
   * Changes the first character of the given string to lower case.
   * @param str Input string.
   * @returns The input string with the first character as lower case (e.g. 'PropertyEditor' -> 'propertyEditor').
   */
  export function stringToFirstCharacterLowerCase(str: string): string {
    str = str?.trim();
    if (!str) return str;

    return str[0].toLowerCase() + str.substring(1);
  }

  /**
   * Changes the first character of the given string to upper case.
   * @param str Input string.
   * @returns The input string with the first character as upper case (e.g. 'editor' -> 'Editor').
   */
  export function stringToFirstCharacterUpperCase(str: string): string {
    str = str?.trim();
    if (!str) return str;

    return str[0].toUpperCase() + str.substring(1);
  }

  /**
   * Converts the given text to camel case (first character of each word as upper case;
   * everything else as lower case).
   * @param str Input string.
   * @param removeSpaces If true, all spaces are removed (e.g. 'camel case' -> 'CamelCase').
   * @returns The input string in camel case (e.g. 'camel case' -> 'CamelCase').
   */
  export function stringToCamelCase(str: string, removeSpaces: boolean = false): string {
    if (!str) return str;
    const words: string[] = str.split(' ').filter(s => !!s);
    return words.map(word => word[0].toUpperCase() + word.substring(1).toLowerCase())
      .join(removeSpaces ? '' : ' ');
  }

  /**
   * Converts the given camel case string without whitespaces back to a text with whitespaces.
   * In front of every upper-case character a whitespace is inserted.
   * All characters in the returned string are lower-case.
   * @param str Input string (camel case).
   * @returns The input string with whitespaces in front of each former upper-case character
   *          (e.g. 'CamelCase' -> 'camel case').
   */
  export function stringFromCamelCase(str: string): string {
    if (!str) return str;

    const regExp: RegExp = /[A-Z]?[^A-Z ]*/g;
    const match = str.matchAll(regExp);
    const words: string[] = [...match]
      .map(match => match[0].trim().toLowerCase())
      .filter(s => !!s);

    return words.join(' ');
  }

  /**
   * Converts a password into a masked string (e.g. '*****') with the same length as the password.
   * @param password A password.
   * @return A masked string with the same length as the password (e.g. '*****').
   */
  export function passwordToMaskedString(password: string): string {
    if (!password) return '';
    return ''.padStart(password.toString().length, '*');
  }

  /**
   * Joins the given strings as sentence with commas and an "and".
   * @param array One or multiple strings (e.g. `"string 1", "string 2", "string 3"`).
   * @returns E.g. `"string 1, string 2 and string 3"`.
   */
  export function stringJoinAnd(...array: string[]): string {
    if (!array?.length) return '';
    if (array.length == 1) return array[0];
    const allItemsButTheLastOne: string[] = array.slice(0, array.length - 1);
    return allItemsButTheLastOne.join(', ') + ' und ' + array[array.length - 1];
  }

  /**
   * Converts a country code to a flag emoji.
   *
   * Code taken from: https://dev.to/jorik/country-code-to-flag-emoji-a21
   *
   * @param countryCode An ISO 3166 country code (two character string).
   * @returns Flag emoji string.
   */
  export function countryCodeToFlagEmoji(countryCode: string): string {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  // endregion

  // region Arrays

  /**
   * Converts an array to a string.
   * @param array An array. If the given value is not an array, an empty string is returned.
   * @param addBrackets If true, brackets are added around the array content like '[item 1, item 2, item 3]'.
   * @param addSpaces If true, spaces and line breaks are in between the items of array values.
   * @returns A string representation of the given array like 'item 1, item 2, item 3'.
   */
  export function arrayToString(array: any[],
                                addBrackets: boolean = false,
                                addSpaces: boolean = false): string {
    if (!Array.isArray(array)) return '';

    const addIndent: boolean = !!array.length && addBrackets && addSpaces;
    const separator: string = addSpaces ? ',\n' : ', ';

    let stringValue: string = array
      .map(item => anyTypeToString(item, true, addSpaces))
      .join(separator);
    if (addIndent) {
      stringValue = '[\n  ' + stringValue.replaceAll('\n', '\n  ') + '\n]';
    } else if (addBrackets) {
      stringValue = '[' + stringValue + ']';
    }

    return stringValue;
  }

  // endregion

  // region Objects

  /**
   * Converts any object to a string.
   * If the object has a custom `toString` function which returns something different to '[object ...]',
   * the result of that function is returned. Otherwise, the default '[object ...]' is returned.
   * @param object An object.
   * @param throwIfNoCustomFunction If true and no custom `toString` function exists on the given object,
   *                                an error is thrown instead of returning the default '[object ...]'.
   * @returns A string representation of the given object.
   */
  export function objectToDefaultString(object: any,
                                        throwIfNoCustomFunction: boolean = false): string {
    const defaultString: string = toString.call(object);

    // Return result of a custom `toString` function, if it differs from the default `toString` function
    try {
      const customString: string | undefined = object?.toString();
      if (customString !== undefined && defaultString !== customString)
        return customString;
    } catch (e) {
    }

    if (throwIfNoCustomFunction) {
      throw new Error('No custom toString function exists.');
    }

    return defaultString;
  }

  /**
   * Converts any object to a string.
   * If the object has a custom `toString` function which returns something different to '[object ...]',
   * the result of that function is returned. Otherwise, the object is stringified using JSON.
   * If that fails the default `toString` function is used as fallback (something like '[object Object]').
   * @param object An object.
   * @param addSpaces If true, spaces and line breaks are added to the JSON format of object values.
   * @param undefinedAsNull If true, any object property with the value `undefined` is stringified as `null`.
   *                        If false, undefined properties are not stringified (JSON format does not support `undefined`).
   * @returns A string representation of the given object, possibly using JSON format.
   */
  export function objectToString(object: any,
                                 addSpaces: boolean = false,
                                 undefinedAsNull: boolean = false): string {
    // Return result of a custom `toString` function, if it differs from the default `toString` function
    try {
      return objectToDefaultString(object, true);
    } catch {
    }

    // Return JSON string if possible
    try {
      const jsonString: string | undefined = JSON.stringify(object,
        undefinedAsNull ? ((key, value) => value === undefined ? null : value) : undefined,
        addSpaces ? 2 : undefined);
      if (jsonString !== undefined)
        return jsonString;
    } catch {
    }

    // Return default toString value as last fallback
    return toString.call(object);
  }

  /**
   * Converts any object to a string with a pretty human-readable format.
   * This format cannot be used to parse the returned string back to an object (like JSON).
   * If the object is empty or the stringifier failed, an empty string is returned.
   * @param object An object.
   * @param addLinebreaks If true, spaces and line breaks are added to the result.
   * @param includeEmptyProperties If false, properties with empty values (undefined, null, empty string) are ignored.
   *                               If true, properties with empty values are included with en empty string as property value.
   * @returns A string representation of the given object.
   */
  export function objectToPrettyString(object: any,
                                       addLinebreaks: boolean = false,
                                       includeEmptyProperties: boolean = false): string {
    if (!object || typeof object !== 'object') return '';

    // Return result of a custom `toString` function, if it differs from the default `toString` function
    try {
      return objectToDefaultString(object, true);
    } catch {
    }

    // Use arrayToString function for array types
    if (Array.isArray(object)) {
      return arrayToString(object, false, addLinebreaks);
    }

    const resultArray: string[] = [];

    // Iterate over all properties
    for (const propertyName in object) {
      if (!object.hasOwnProperty(propertyName)) continue;

      // Get property value
      let propertyValue = object[propertyName];
      // Stringify property value
      propertyValue = anyTypeToString(propertyValue, false, addLinebreaks, includeEmptyProperties);
      if (!addLinebreaks)
        propertyValue = propertyValue.trim();
      if (!includeEmptyProperties && !propertyValue) continue;

      // Split propertyValue into lines and append lines to resultArray
      const propertyValueLines: string[] = propertyValue.split('\n');
      if (propertyValueLines.length > 1) {
        if (addLinebreaks) {
          resultArray.push(`${propertyName}:`);
          resultArray.push(...propertyValueLines.map(line => '  ' + line));
        } else {
          resultArray.push(`${propertyName}: ${propertyValueLines.map(item => item.trim()).join(' ')}`);
        }
      } else {
        resultArray.push(`${propertyName}: ${propertyValue}`);
      }
    }

    if (addLinebreaks) {
      return resultArray
        .map(item => item.trimEnd())
        .join(',\n');
    } else {
      return resultArray
        .map(item => item.trim())
        .join(', ');
    }
  }

  // endregion

  // region Any Type

  /**
   * Converts any value to a string. If `Stringifier` contains a conversion function
   * for the given value type, it is used to convert the value to a string.
   * Otherwise, the default `toString()` function is used.
   * @param value Any value.
   * @param addBrackets Array values: If true, brackets are added around array values like '[item 1, item 2, item 3]'.
   *                    Object values: If true, object values are returned with JSON format;
   *                                   if false they are returned with a pretty human-readable format.
   * @param addSpaces Array values: If true, spaces and line breaks are added in between the items of array values.
   *                  Object values: If true, spaces and line breaks are added to the JSON format of object values.
   * @param includeUndefined If true and an object value is stringified using JSON format, any of its properties with
   *                        the value `undefined` is stringified as `null`. If false, undefined properties are not
   *                        stringified (JSON format does not support `undefined`).
   * @returns A string representation of the given value.
   */
  export function anyTypeToString(value: any,
                                  addBrackets: boolean = false,
                                  addSpaces: boolean = false,
                                  includeUndefined: boolean = false): string {
    if (value == undefined) {
      return '';
    }

    switch (typeof value) {
      case 'boolean':
        return booleanToString(value);
      case 'number':
      case 'bigint':
        return numberToString(value);
      case 'string':
        return value;
      case 'function':
        return anyTypeToString(value(), addBrackets, addSpaces, includeUndefined);

      case 'object':
        if (Array.isArray(value)) {
          return arrayToString(value, addBrackets, addSpaces);
        } else if (value instanceof Date) {
          return dateToString(value);
        } else if (value instanceof File) {
          return value.name;
        }
        if (addBrackets) {
          return objectToString(value, addSpaces, includeUndefined);
        } else {
          return objectToPrettyString(value, addSpaces, includeUndefined);
        }
    }

    return value.toString();
  }

  /**
   * Converts any value to a string. If `Stringifier` contains a conversion function
   * for the given property type, it is used to convert the value to a string.
   * Otherwise, the default `toString()` function is used.
   * @param value Any value. This value is considered to match the `propertyType` and
   *              not to be an array.
   * @param propertyType The property type of a `PropertyConfiguration`.
   * @param addBrackets Array values: If true, brackets are added around array values like '[item 1, item 2, item 3]'.
   *                    Object values: If true, object values are returned with JSON format;
   *                                   if false they are returned with a pretty human-readable format.
   * @param addSpaces Array values: If true, spaces and line breaks are added in between the items of array values.
   *                  Object values: If true, spaces and line breaks are added to the JSON format of object values.
   * @param includeUndefined If true and an object value is stringified using JSON format, any of its properties with
   *                        the value `undefined` is stringified as `null`. If false, undefined properties are not
   *                        stringified (JSON format does not support `undefined`).
   * @returns A string representation of the given value.
   */
  export function propertyTypeToString(value: any,
                                       propertyType: PropertyType | undefined,
                                       addBrackets: boolean = false,
                                       addSpaces: boolean = false,
                                       includeUndefined: boolean = false): string {
    if (propertyType) {
      // Fix property type, if value type is not matching
      if (typeof value === 'boolean' && !PropertyTypeController.propertyTypeIsBoolean(propertyType))
        propertyType = 'boolean';
      if (value && value instanceof Date && !PropertyTypeController.propertyTypeIsDate(propertyType))
        propertyType = 'date';
      if (typeof value === 'number' && !PropertyTypeController.propertyTypeIsNumber(propertyType))
        propertyType = 'number';
      if (typeof value === 'string' && !PropertyTypeController.propertyTypeIsString(propertyType))
        propertyType = 'string';
    }

    switch (propertyType) {

      case 'boolean':
        return booleanToString(value);
      case 'boolean-indeterminate':
        return booleanToString(value, undefined, true);

      case 'date':
        return dateToString(value, true, false);
      case 'datetime':
        return dateToString(value, true, true);
      case 'time':
        return dateToString(value, false, true);
      case 'month':
        return dateMonthAndYearToString(value);

      case 'number':
      case 'rating':
      case 'difficulty':
      case 'year':
        return numberToString(value, false);

      case 'string':
      case 'id':
      case 'string-multiline':
      case 'tel':
      case 'email':
      case 'url':
      case 'color':
      case 'color-class':
      case 'icon':
        return value?.toString();

      case 'password':
        return passwordToMaskedString(value);

      case 'select':
      case undefined:
      default:
        return anyTypeToString(value, addBrackets, addSpaces, includeUndefined);
    }
  }

  // endregion

}
