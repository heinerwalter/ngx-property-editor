// Setup FontAwesome library with all solid icons.
// See documentation at: https://docs.fontawesome.com/apis/javascript/icon-library
import { findIconDefinition, IconDefinition, library, parse } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);


export module PEGlobalFunctions {

  // region ID

  /**
   * Generates a new random ID for components which don't have an assigned ID.
   */
  export function generateRandomId(): string {
    const length: number = 20;
    let result: string = '';
    // noinspection SpellCheckingInspection
    const characters: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // endregion

  // region Date


  /**
   * This function calls `Date.UTC()` with the given date parameters treating them as UTC.
   * The timestamp returned by `Date.UTC()` is then passed to the constructor of a new `Date` object.
   * @param year Integer value representing the year. Values from 0 to 99 map to the years 1900 to 1999. All other values are the actual year.
   * @param monthIndex Integer value representing the month, beginning with 0 for January to 11 for December. Defaults to 0.
   * @param day Integer value representing the day of the month. Defaults to 1.
   * @param hours Integer value between 0 and 23 representing the hour of the day. Defaults to 0.
   * @param minutes Integer value representing the minute segment of a time. Defaults to 0.
   * @param seconds Integer value representing the second segment of a time. Defaults to 0.
   * @param ms Integer value representing the millisecond segment of a time. Defaults to 0.
   * @returns A `Date` instance of the given date. Returns undefined if the date is invalid.
   */
  export function createDateUTC(year: number, monthIndex: number = 0, day: number = 1, hours: number = 0, minutes: number = 0, seconds: number = 0, ms: number = 0): Date | undefined {
    const timestamp: number = Date.UTC(year, monthIndex || 0, day == undefined ? 1 : day, hours || 0, minutes || 0, seconds || 0, ms || 0);
    if (isNaN(timestamp)) return undefined;
    return new Date(timestamp);
  }

  // endregion

  // region Data source

  /**
   * Evaluates a `valuePropertyName` on the given data source `item`.
   * @param valuePropertyName Evaluate this property name on the given data source item to get its value.
   *                          If undefined, the whole data source item is used as value.
   * @param item An item of a data source.
   */
  export function evaluateValuePropertyName(valuePropertyName: string | undefined,
                                            item: any | undefined): any {
    if (!item || !valuePropertyName) return item;
    return item[valuePropertyName];
  }

  /**
   * Evaluates a `displayPropertyName` on the given data source `item`.
   * @param displayPropertyName Evaluate this property name on the given data source item to get its display text.
   *                            If undefined, the whole data source item is used as display text.
   * @param item An item of a data source.
   */
  export function evaluateDisplayPropertyName(displayPropertyName: string | undefined,
                                              item: any | undefined): string {
    if (!item) return '';
    if (!displayPropertyName) return item.toString();
    return item[displayPropertyName]?.toString() || '';
  }

  /**
   * Returns the item of a data source with the given value.
   * @param dataSource A data source.
   * @param valuePropertyName Evaluate this property name on the data source items to get their values.
   *                          If undefined, the whole data source item is used as value.
   * @param value Search for a data source item with this value
   * @returns The first data source item matching the given value or undefined, if no such item exists.
   */
  export function getDataSourceItem(dataSource: any[],
                                    valuePropertyName: string | undefined,
                                    value: any): any | undefined {
    if (!dataSource) return undefined;
    return dataSource.find(item => evaluateValuePropertyName(valuePropertyName, item) == value);
  }

  // endregion

  // region FontAwesome icons

  /**
   * Converts a FontAwesome icon name to an icon definition object.
   * @param iconName Name or alias of a FontAwesome icon (e.g. 'user', 'fa-user', 'fa-solid fa-user').
   * @returns The FontAwesome icon definition object, or undefined if the given icon name is invalid.
   */
  export function getFontAwesomeIconDefinition(iconName: string | undefined): IconDefinition | undefined {
    if (!iconName) return undefined;

    try {
      const iconLookup = parse.icon(iconName);
      if (!iconLookup) return undefined;
      return findIconDefinition(iconLookup) || undefined;
    } catch {
      return undefined;
    }
  }

  // endregion

}
