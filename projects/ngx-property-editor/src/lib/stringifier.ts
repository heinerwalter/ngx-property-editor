export class Stringifier {

  /** Static class. */
  private constructor() {
  }

  // region Booleans

  // TODO: add boolean to string function

  // endregion

  // region Dates

  /**
   * Gets the month and year of the given date as string using the current locale.
   * @param date A Date.
   */
  public static toMonthString(date: Date | undefined): string {
    return date?.toLocaleDateString(navigator.language, { year: 'numeric', month: 'long' }) || '';
  }

  /**
   * Gets a short date and/or time string of the given date using the current locale.
   * @param date A Date.
   * @param includeDate Include date in the result.
   * @param includeTime Include time in the result.
   *                    Use 'auto' to include the time, if any date component is different from zero.
   */
  public static toDateString(date: Date | undefined,
                             includeDate: boolean = true,
                             includeTime: boolean | 'auto' = 'auto'): string {
    function includeTimeAuto(): boolean {
      return !!date &&
        (date.getHours() != 0 || date.getMinutes() != 0 || date.getSeconds() != 0 || date.getMilliseconds() != 0);
    }

    const options: any = {};
    if (includeDate) options['dateStyle'] = 'medium';
    if (includeTime == 'auto' ? includeTimeAuto() : includeTime) options['timeStyle'] = 'short';
    return date?.toLocaleDateString(navigator.language, options) || '';
  }

  /**
   * Gets a date string as used in file names (format: 'YYYY-MM-DD').
   * @param date A Date.
   */
  public static toDateStringFileName(date: Date | undefined): string {
    if (!date) return '';
    const year: string = this.toPaddedString(date.getFullYear(), 4);
    const month: string = this.toPaddedString(date.getMonth() + 1, 2);
    const day: string = this.toPaddedString(date.getDate(), 2);
    return `${year}-${month}-${day}`;
  }

  // endregion

  // region Numbers

  /**
   * Returns the given number as padded string with a minimum length.
   * @param value Convert this number to a padded string. Works best for integer numbers.
   * @param targetLength Minimum length of the returned string. If the number
   *                     is too short, zeros are added at the beginning.
   * @see String.prototype.padStart
   */
  public static toPaddedString(value: number, targetLength: number): string {
    return (value?.toString() || '').padStart(targetLength, '0');
  }

  /**
   * Returns the given number as string formatted as currency with the given currency Symbol (if available).
   * @param amount Amount of a currency.
   * @param currency Optional: currency name or symbol (e.g. '€' or 'EUR').
   */
  public static toCurrencyString(amount: number | undefined, currency?: string): string {
    if (amount == undefined || isNaN(amount)) return '';

    const amountString: string = amount.toLocaleString(navigator.language, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    currency = currency?.trim().toUpperCase() || '';

    switch (currency) {
      case 'USD':
      case '$':
        return `${ currency } ${ amountString }`.trim();
      default:
        return `${ amountString } ${ currency }`.trim();
    }
  }

  /**
   * Converts an integer to words as it is spoken.
   * The remainder of a decimal number is ignored.
   * This function only supports the german language yet.
   * @param value An integer.
   * @returns The given number as words like "[minus] zweiundvierzig".
   * @see numberToWordsString
   */
  public static integerToWordsString(value: number) {
    // In Anlehnung an eine Klassenprogrammierung von Hans W. Hofmann
    const oneToNineteen: string[] = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
    const tens: string[] = ['', 'zehn', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
    const thousandsAndMore: string[] = ['', 'tausend', 'millionen', 'milliarden'];

    /** Converts the last three digits of a number to a word. */
    function lastThreeDigitsToWordsString(value: number): string {
      let result: string;
      const belowOnehundred: number = value % 100;
      if (belowOnehundred < 20) {
        result = oneToNineteen[belowOnehundred];
      } else {
        result = oneToNineteen[belowOnehundred % 10] + (belowOnehundred % 10 > 0 ? 'und' : '') + tens[Math.trunc(belowOnehundred / 10)];
      }
      const hundred: number = ((value % 1000) - belowOnehundred) / 100;
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
    // Iterate over sections of three digits starting at the back (least significant digit)
    let i: number = 0;
    while (value > 0) {
      const section: number = value % 1000;
      if (section > 0) {
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
   * Converts a number to words as it is spoken.
   * In contrast to the function `integerToWordsString` this function converts decimal places, too.
   * This function only supports the german language yet.
   * @param value A number.
   * @param includeDecimalPlaces Include this amount of decimal places in the result (if 0, no decimal places are included).
   * @param unit Add this string as unit after the integer part.
   * @param decimalUnit Add this string as unit after the decimal places (if any).
   * @returns The given number as words like "[minus] zweiundvierzig [{unit}] [einundzwanzig [{decimalUnit}]]".
   * @see integerToWordsString
   */
  public static numberToWordsString(value: number, includeDecimalPlaces: number = 2, unit?: string, decimalUnit?: string) {
    const integer: number = Math.trunc(value);
    const decimalPlaces: number = Math.trunc((Math.abs(value) - Math.abs(integer)) * Math.pow(10, Math.max(includeDecimalPlaces, 0)));

    // Add space before units, if not empty
    unit = unit?.trim() || '';
    if (unit) unit = ' ' + unit;
    decimalUnit = decimalUnit?.trim() || '';
    if (decimalUnit) decimalUnit = ' ' + decimalUnit;

    if (decimalPlaces == 0) {
      return this.integerToWordsString(integer) + unit;
    } else {
      return this.integerToWordsString(integer) + unit + ' ' + this.integerToWordsString(decimalPlaces) + decimalUnit;
    }
  }

  /**
   * Converts an amount of euros to words as it is spoken.
   * This function only supports the german language yet.
   * @param value A currency number.
   * @returns The given number as words like "[minus] zweiundvierzig Euro [einundzwanzig Cent".
   * @see numberToWordsString
   */
  public static euroToWordsString(value: number) {
    return this.numberToWordsString(value, 2, 'Euro', 'Cent');
  }

  // endregion

  // region Strings

  /**
   * Converts the given text to camel case (first character of each word as upper case;
   * everything else as lower case).
   */
  public static toCamelCase(str: string): string {
    if (!str) return str;
    const words: string[] = str.split(' ').filter(s => !!s);
    return words.map(word => word[0].toUpperCase() + word.substring(1).toLowerCase())
      .join(' ');
  }

  // endregion

  // region Arrays

  // TODO: add array to string function

  // endregion

}
