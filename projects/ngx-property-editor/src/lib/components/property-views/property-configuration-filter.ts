import { PropertyConfiguration } from "./property-configuration";
import { PropertyEditorMode } from "./property-editor-mode";
import { propertyTypeIsBoolean, propertyTypeIsDate, propertyTypeIsNumber, propertyTypeIsString } from "./property-type";

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
      const booleanValue: boolean | undefined = value as boolean | undefined;
      return evaluateBooleanFilter(booleanValue, filter);
    } else if (propertyTypeIsDate(propertyConfiguration.propertyType)) {
      const dateValue: Date | undefined = value as Date | undefined;
      return evaluateDateFilter(dateValue, filter);
    } else if (propertyTypeIsNumber(propertyConfiguration.propertyType)) {
      const numberValue: number | undefined = value as number | undefined;
      return evaluateNumberFilter(numberValue, filter);
    } else if (propertyTypeIsString(propertyConfiguration.propertyType)) {
      const stringValue: string | undefined = value as string | undefined;
      return evaluateStringFilter(stringValue, filter);
    }

    return true;
  }

  /**
   * Evaluates the given filter expression on a boolean property value.
   * @param value A property value.
   * @param filter A filter expression as string.
   * @returns True, if the filter matches the property value.
   *          If the `filter` is empty, true is returned.
   */
  export function evaluateBooleanFilter(value: boolean | undefined, filter: string): boolean {
    filter = filter?.trim();
    if (!filter) return true;

    return true;
  }

  /**
   * Evaluates the given filter expression on a date property value.
   * @param value A property value.
   * @param filter A filter expression as string.
   * @returns True, if the filter matches the property value.
   *          If the `filter` is empty, true is returned.
   */
  export function evaluateDateFilter(value: Date | undefined, filter: string): boolean {
    filter = filter?.trim();
    if (!filter) return true;

    return true;
  }

  /**
   * Evaluates the given filter expression on a number property value.
   * @param value A property value.
   * @param filter A filter expression as string.
   * @returns True, if the filter matches the property value.
   *          If the `filter` is empty, true is returned.
   */
  export function evaluateNumberFilter(value: number | undefined, filter: string): boolean {
    filter = filter?.trim();
    if (!filter) return true;

    return true;
  }

  /**
   * Evaluates the given filter expression on a string property value.
   * @param value A property value.
   * @param filter A filter expression as string.
   * @returns True, if the filter matches the property value.
   *          If the `filter` is empty, true is returned.
   */
  export function evaluateStringFilter(value: string | undefined, filter: string): boolean {
    filter = filter?.trim();
    if (!filter) return true;

    if (!value?.toLowerCase().includes(filter)) return false;
    return true;
  }

}
