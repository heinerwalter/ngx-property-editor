import { PropertyTableColumn } from './property-table-column';
import { PropertyConfiguration } from '../property-views/property-configuration';
import { PropertyEditorMode } from '../property-views/property-editor-mode';
import { PropertyFilter, PropertyTableFilter } from './property-table-filter';

/**
 * This module contains functions for evaluating filter expressions
 * on multiple columns of a property table.
 */
export namespace PropertyTableFilterController {

  /**
   * Evaluates a global filter expression on all given property table columns
   * of the given data object (row). If the filter matches the data object on
   * at least one column, this function returns true.
   * @param columns Visible property table columns.
   * @param data The data object.
   * @param filter The global filter expression.
   * @param mode Property editor mode used to evaluate the property value (should always be 'table').
   * @returns True, if the given data object should be displayed (filter is empty or matching at least one column).
   */
  export function evaluateGlobalFilter(
    columns: PropertyTableColumn[],
    data: any,
    filter: string,
    mode: PropertyEditorMode = 'table'
  ): boolean {
    // Is the filter empty?
    if (!filter) return true;
    // Is any column visible?
    if (!columns?.length) return false;
    // Does the data object exist?
    if (!data || typeof data !== 'object') return false;
  
    // Iterate over all columns and apply the filter on those columns to the data object
    for (const column of columns) {
      if (column.isGroup) {
        // Evaluate filter on child columns
        if (evaluateGlobalFilter(column.children, data, filter, mode))
          // Filter is matching on one column
          return true;

      } else {
        // Evaluate filter expression on the property value
        if (column.property.evaluateFilter(data, mode, filter))
          // Filter is matching on one column
          return true;
      }
    }

    // Filters is not matching on any column
    return false;
  }

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
