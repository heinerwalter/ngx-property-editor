import { PropertyConfiguration } from './property-configuration';
import { PropertyEditorMode } from './property-editor-mode';
import { propertyTypeIsBoolean, propertyTypeIsDate, propertyTypeIsNumber, propertyTypeIsString } from './property-type';

/**
 * This module contains functions for evaluating filter expressions
 * on property configurations.
 */
export module PropertyConfigurationFilter {

  /**
   * Evaluates the given filter expression on a property value.
   * The property value is evaluated from the given `data` object
   * using the given `propertyConfiguration`.
   * @param propertyConfiguration A property configuration.
   * @param data The data object.
   * @param mode Property editor mode used to evaluate the property value.
   * @param filter A filter expression as string.
   * @returns True, if the filter matches the property value.
   *          If the `filter` is empty, true is returned.
   *          If the `propertyConfiguration` is empty or its `propertyType`
   *          does not support filtering, true is returned.
   */
  export function evaluateFilter(propertyConfiguration: PropertyConfiguration,
                                 data: any,
                                 mode: PropertyEditorMode,
                                 filter: string): boolean {
    if (!filter) return true;
    if (!propertyConfiguration?.propertyType) return true;

    // Get property value
    const value = propertyConfiguration.getValue(data, mode);

    if (propertyTypeIsBoolean(propertyConfiguration.propertyType)) {
      const booleanValue = value as boolean | boolean[] | undefined;
      return evaluateBooleanFilter(booleanValue, filter);
    } else if (propertyTypeIsDate(propertyConfiguration.propertyType)) {
      const dateValue = value as Date | Date[] | undefined;
      return evaluateDateFilter(dateValue, filter);
    } else if (propertyTypeIsNumber(propertyConfiguration.propertyType)) {
      const numberValue = value as number | number[] | undefined;
      return evaluateNumberFilter(numberValue, filter);
    } else if (propertyTypeIsString(propertyConfiguration.propertyType)) {
      const stringValue = value as string | string[] | undefined;
      return evaluateStringFilter(stringValue, filter);
    }

    return true;
  }

  /**
   * Evaluates the given filter expression on an array property value.
   * @param value An array property value.
   * @param filter A filter expression as string.
   * @param evaluateFunction One of the evaluate filter functions for the specific value type.
   * @returns True, if the filter matches at least one item of the array property value.
   */
  function handleArrayValue<TValue>(value: TValue[], filter: string, evaluateFunction: (value: TValue | TValue[] | undefined, filter: string) => boolean): boolean {
    for (const item of value) {
      if (evaluateFunction(item, filter)) return true;
    }
    return false;
  }

  /**
   * Evaluates the given filter expression on a boolean property value.
   * @param value A property value.
   * @param filter A filter expression as string.
   * @returns True, if the filter matches the property value.
   *          If the `filter` is empty, true is returned.
   */
  export function evaluateBooleanFilter(value: boolean | boolean[] | undefined, filter: string): boolean {
    filter = filter?.trim().toLocaleLowerCase();
    if (!filter) return true;

    if (Array.isArray(value)) {
      return handleArrayValue(value, filter, evaluateBooleanFilter);
    }

    switch (filter) {
      case 'true':
        return value == true;
      case 'false':
        return value == false;
      case 'undefined':
        return value == undefined;
      default:
        // TODO: Handle invalid filter!
        return true;
    }
  }

  /**
   * Evaluates the given filter expression on a date property value.
   * @param value A property value.
   * @param filter A filter expression as string.
   * @returns True, if the filter matches the property value.
   *          If the `filter` is empty, true is returned.
   */
  export function evaluateDateFilter(value: Date | Date[] | undefined, filter: string): boolean {
    filter = filter?.trim();
    if (!filter) return true;

    if (Array.isArray(value)) {
      return handleArrayValue(value, filter, evaluateDateFilter);
    }

    // TODO

    return true;
  }

  /**
   * Evaluates the given filter expression on a number property value.
   * @param value A property value.
   * @param filter A filter expression as string.
   * @returns True, if the filter matches the property value.
   *          If the `filter` is empty, true is returned.
   */
  export function evaluateNumberFilter(value: number | number[] | undefined, filter: string): boolean {
    filter = filter?.trim();
    if (!filter) return true;

    if (Array.isArray(value)) {
      return handleArrayValue(value, filter, evaluateNumberFilter);
    }

    let operator: string = '=';
    let filterValue: number = parseInt(filter);

    if (isNaN(filterValue)) {
      // Extract operator and value from filter expression
      let operators = ['=', '!=', '>', '>=', '<', '<='];
      const regexp: RegExp = new RegExp(`^(?<operator>${operators.join('|')})(?<value>[^=].*)$`);
      const match = filter.match(regexp);
      if (match) {
        operator = match.groups!['operator'];
        filterValue = parseInt(match.groups!['value']?.trim());

        if (isNaN(filterValue)) {
          // TODO: Handle invalid filter!
          return true;
        }
      } else {
        // TODO: Handle invalid filter!
        return true;
      }
    }

    if (value == undefined) {
      return false;
    }

    switch (operator) {
      case '=':
        return value == filterValue;
      case '!=':
        return value != filterValue;
      case '>':
        return value > filterValue;
      case '>=':
        return value >= filterValue;
      case '<':
        return value < filterValue;
      case '<=':
        return value <= filterValue;
    }

    return true;
  }

  /**
   * Evaluates the given filter expression on a string property value.
   * @param value A property value.
   * @param filter A filter expression as string.
   * @returns True, if the filter matches the property value.
   *          If the `filter` is empty, true is returned.
   */
  export function evaluateStringFilter(value: string | string[] | undefined, filter: string): boolean {
    filter = filter?.trim().toLocaleLowerCase();
    if (!filter) return true;

    if (Array.isArray(value)) {
      return handleArrayValue(value, filter, evaluateStringFilter);
    }

    if (!value?.toLowerCase().includes(filter)) return false;
    return true;
  }

}
