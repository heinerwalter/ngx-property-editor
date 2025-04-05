import { PropertyConfiguration } from '../../property-views/property-configuration';
import { PropertyEditorMode } from '../../property-views/property-editor-mode';
import { PropertyFilter } from '../property-table-filter';
import { PropertyTypeController } from '../../property-views/controller/property-type-controller';
import { Stringifier } from '../../../controller/stringifier';

/**
 * This module contains functions for evaluating filter expressions
 * on property configurations.
 */
export namespace PropertyConfigurationFilterController {

  /**
   * Evaluates the given filter expression on a property value.
   * The property value is evaluated from the given `data` object
   * using the property configuration of the given `propertyFilter` object.
   * @param propertyFilter A property filter object containing a property
   *                       configuration and a filter expression.
   * @param data The data object.
   * @param mode Property editor mode used to evaluate the property value.
   * @returns True, if the filter matches the property value.
   *          If the filter expression is empty, true is returned.
   *          If the property configuration is empty or its `propertyType`
   *          does not support filtering, true is returned.
   */
  export function evaluatePropertyFilter(
    propertyFilter: PropertyFilter,
    data: any,
    mode: PropertyEditorMode,
  ): boolean {
    if (!propertyFilter?.property || !propertyFilter.filter) return true;

    return evaluateFilter(
      propertyFilter.property,
      data,
      mode,
      propertyFilter.filter);
  }

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
   *          does not support filtering, false is returned.
   */
  export function evaluateFilter(
    propertyConfiguration: PropertyConfiguration,
    data: any,
    mode: PropertyEditorMode,
    filter: string,
  ): boolean {
    if (!filter) return true;
    if (!propertyConfiguration?.propertyType) return false;

    // Filter special property types:
    switch (propertyConfiguration.propertyType) {
      case 'select':
        const displayValue = propertyConfiguration.getDisplayValue(data, mode);
        return evaluateStringFilter(displayValue, filter);

      case 'button':
        // Filter buttons by label.
        // This does not make much sense though; the filter is usually hidden for such property types.
        const label = propertyConfiguration.getLabel(data, mode);
        return evaluateStringFilter(label, filter);
    }

    // Get property value
    const value = propertyConfiguration.getValue(data, mode);

    if (PropertyTypeController.propertyTypeIsBoolean(propertyConfiguration.propertyType)) {
      const booleanValue = value as boolean | boolean[] | undefined;
      return evaluateBooleanFilter(booleanValue, filter);
    } else if (PropertyTypeController.propertyTypeIsDate(propertyConfiguration.propertyType)) {
      const dateValue = value as Date | Date[] | undefined;
      return evaluateDateFilter(dateValue, filter);
    } else if (PropertyTypeController.propertyTypeIsNumber(propertyConfiguration.propertyType)) {
      const numberValue = value as number | number[] | undefined;
      return evaluateNumberFilter(numberValue, filter);
    } else if (PropertyTypeController.propertyTypeIsString(propertyConfiguration.propertyType)) {
      const stringValue = value as string | string[] | undefined;
      return evaluateStringFilter(stringValue, filter);
    }

    return false;
  }

  /**
   * Evaluates the given filter expression on an array property value.
   * @param value An array property value.
   * @param filter A filter expression as string.
   * @param evaluateFunction One of the evaluate filter functions for the specific value type.
   * @returns True, if the filter matches at least one item of the array property value.
   */
  function handleArrayValue<TValue>(
    value: TValue[],
    filter: string,
    evaluateFunction: (value: TValue | TValue[] | undefined, filter: string) => boolean,
  ): boolean {
    for (const item of value) {
      if (evaluateFunction(item, filter)) return true;
    }
    return false;
  }

  /**
   * This function generates the return value of the evaluate filter functions
   * in case the given filter expression is invalid.
   */
  function handleInvalidFilter(): boolean {
    // TODO: Handle invalid filter!
    return false;
  }

  /**
   * Evaluates the given filter expression on a boolean property value.
   * @param value A property value.
   * @param filter A filter expression as string.
   * @returns True, if the filter matches the property value.
   *          If the `filter` is empty, true is returned.
   */
  export function evaluateBooleanFilter(
    value: boolean | boolean[] | undefined,
    filter: string,
  ): boolean {
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
        return handleInvalidFilter();
    }
  }

  /**
   * Evaluates the given filter expression on a date property value.
   * @param value A property value.
   * @param filter A filter expression as string.
   * @param disableOperator If true, the filter expression cannot contain an operator
   *                        and an equality comparison is done always.
   * @returns True, if the filter matches the property value.
   *          If the `filter` is empty, true is returned.
   */
  export function evaluateDateFilter(
    value: Date | Date[] | undefined,
    filter: string,
    disableOperator: boolean = false,
  ): boolean {
    filter = filter?.trim();
    if (!filter) return true;

    if (Array.isArray(value)) {
      return handleArrayValue(value, filter, evaluateDateFilter);
    }

    if (value == undefined) return false;
    // noinspection SuspiciousTypeOfGuard
    if (typeof value === 'number') value = new Date(value);

    // TODO: Implement more intelligent date filter with operators
    const stringValue = Stringifier.dateToString(value, true, true);
    return evaluateStringFilter(stringValue, filter);
  }

  /**
   * Evaluates the given filter expression on a number property value.
   * @param value A property value.
   * @param filter A filter expression as string.
   * @param disableOperator If true, the filter expression cannot contain an operator
   *                        and an equality comparison is done always.
   * @returns True, if the filter matches the property value.
   *          If the `filter` is empty, true is returned.
   */
  export function evaluateNumberFilter(
    value: number | number[] | undefined,
    filter: string,
    disableOperator: boolean = false,
  ): boolean {
    filter = filter?.trim();
    if (!filter) return true;

    if (Array.isArray(value)) {
      return handleArrayValue(value, filter, evaluateNumberFilter);
    }

    let operator: string = '=';
    let filterValue: number = parseInt(filter);

    if (isNaN(filterValue)) {
      if (!disableOperator) {
        // Extract operator and value from filter expression
        let operators = ['=', '!=', '>', '>=', '<', '<='];
        const regexp: RegExp = new RegExp(`^(?<operator>${operators.join('|')})(?<value>[^=].*)$`);
        const match = filter.match(regexp);
        if (match) {
          operator = match.groups!['operator'];
          filterValue = parseInt(match.groups!['value']?.trim());

          if (isNaN(filterValue)) {
            return handleInvalidFilter();
          }
        } else {
          return handleInvalidFilter();
        }
      } else {
        return handleInvalidFilter();
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
  export function evaluateStringFilter(
    value: string | string[] | undefined,
    filter: string,
  ): boolean {
    filter = filter?.trim().toLocaleLowerCase();
    if (!filter) return true;

    if (Array.isArray(value)) {
      return handleArrayValue(value, filter, evaluateStringFilter);
    }

    if (!value?.toLowerCase().includes(filter)) return false;
    return true;
  }

  /**
   * Evaluates the given filter expression on a property value with unknown type (property type 'select').
   * @param value A property value.
   * @param filter A filter expression as string.
   * @returns True, if the filter matches the property value.
   *          If the `filter` is empty, true is returned.
   */
  export function evaluateAnyTypeFilter(
    value: any | any[] | undefined,
    filter: string,
  ): boolean {
    filter = filter?.trim().toLocaleLowerCase();
    if (!filter) return true;

    if (Array.isArray(value)) {
      return handleArrayValue(value, filter, evaluateAnyTypeFilter);
    }

    // Search for value type
    if (typeof value === 'boolean') {
      return evaluateBooleanFilter(value, filter);
    } else if (value instanceof Date) {
      return evaluateDateFilter(value, filter, true);
    } else if (typeof value === 'number') {
      return evaluateNumberFilter(value, filter, true);
    } else {
      return evaluateStringFilter(value?.toString(), filter);
    }
  }

}
