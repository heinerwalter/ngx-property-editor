import { PropertyConfiguration } from '../property-views/property-configuration';
import { PropertyEditorMode } from '../property-views/property-editor-mode';
import { PropertyFilter, PropertyTableFilter } from './property-table-filter';

/**
 * This module contains functions for evaluating filter expressions
 * on multiple columns of a property table.
 */
export namespace PropertyTableFilterController {

  /**
   * Evaluates the `filter` object on the given data object (row).
   * @param data The data object.
   * @param filter The filter object containing filter expressions
   *               of multiple property table columns.
   * @param mode Property editor mode used to evaluate the property value (should always be 'table').
   * @returns True, if the given data object should be displayed (filter is empty or matching).
   */
  export function evaluateFilters(
    data: any,
    filter: PropertyTableFilter,
    mode: PropertyEditorMode = 'table'
  ): boolean {
    // Is the filter empty?
    if (!filter || typeof filter !== 'object') return true;
    const filterKeys: string[] = Object.getOwnPropertyNames(filter);
    if (!filterKeys.length) return true;

    // Does the data object exist?
    if (!data || typeof data !== 'object') return false;
  
    // Iterate over all filters and apply them to the data object
    for (const key of filterKeys) {
      const singleFilter: PropertyFilter = filter[key];
  
      // Get filter expression
      const filterExpression: string = singleFilter.filter?.toString().toLowerCase();
      // Is the filter expression empty?
      if (!filterExpression) continue;
  
      // Evaluate filter expression on the property value
      if (!singleFilter.property.evaluateFilter(data, mode, filterExpression))
        // One filter does not match
        return false;
    }
  
    // All filters are matching
    return true;
  }

  /**
   * Generates the key of a sigle property table column filter
   * inside a `PropertyTableFilter` object.
   * 
   * The key is the `propertyName` of the property configuration related
   * to the filtered table column. If it does not contain a property name,
   * a random string containing the column index is used as key instead.
   * @param propertyConfiguration Property configuration on which the filtered column is based.
   * @param columnIndex Index of the property table column.
   */
  export function generateColumnFilterKey(
    propertyConfiguration: PropertyConfiguration,
    columnIndex: number
  ): string {
    if (propertyConfiguration.propertyName) {
      return propertyConfiguration.propertyName.replaceAll('.', '_');
    } else {
      return `#column-index#${columnIndex}`;
    }
  }

}
