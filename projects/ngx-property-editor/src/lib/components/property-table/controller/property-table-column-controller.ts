import { PropertyTableColumn } from '../property-table-column';
import { PropertyConfiguration } from '../../property-views/property-configuration';

/**
 * This module provides functions to generate `PropertyTableColumns`
 * from `PropertyConfiguration`s.
 */
export namespace PropertyTableColumnController {

  /**
   * This function is used to determine whether a `PropertyConfiguration`
   * should be skipped when generating `PropertyTableColumn`s.
   * @param property The `PropertyConfiguration` to check.
   * @returns `true` if the property should be skipped (separator or hidden),
   *          `false` otherwise.
   * @private
   */
  function skipPropertyConfiguration(property: PropertyConfiguration): boolean {
    // Is the property a separator?
    if (property.separator)
      return true;

    // Is the property completely hidden in table mode?
    const isHidden = property.isHidden(undefined, 'table', true);
    if (isHidden == true)
      return true;

    return false;
  }

  /**
   * Generates a `PropertyTableColumn` from a `PropertyConfiguration`.
   * @param property The `PropertyConfiguration` to generate the column from.
   * @param parentColumn Optional parent column, if the `propertyConfiguration` is part of a group.
   * @returns A `PropertyTableColumn` generated from property configuration,
   *          or `undefined`, if the `propertyConfiguration` should not be displayed as column.
   * @private
   * @see generateColumns
   */
  function generateColumn(
    property: PropertyConfiguration,
    parentColumn: PropertyTableColumn | undefined = undefined
  ): PropertyTableColumn | undefined {
    // The function `skipPropertyConfiguration()` is already called in `generateColumns()`.
    // So we don't need to check it here again.
    //if (skipPropertyConfiguration(property)) return undefined;

    // Build the column
    const column: PropertyTableColumn = new PropertyTableColumn(
      property,
      property.isHidden(undefined, 'table', true) == false,
      parentColumn);

    // Has the property a group?
    if (property.hasGroup) {
      // Children of disabled groups are already handled by the function `generateColumns()`.

      // Generate child columns
      const childProperties: PropertyConfiguration[] = property.flatGroup;
      const childColumns = generateColumns(childProperties, column);

      // Don't return a group column without any children
      if (!childColumns.length)
        return undefined;

      column.children.push(...childColumns);
    }

    return column;
  }

  /**
   * Generates an array of `PropertyTableColumn`s from an array of `PropertyConfiguration`s.
   * @param properties The array of `PropertyConfiguration`s to generate columns from.
   * @param parentColumn Optional parent column, if the `propertyConfiguration` is part of a group.
   * @returns An array of `PropertyTableColumn`s generated from the property configurations.
   */
  export function generateColumns(
    properties: PropertyConfiguration[],
    parentColumn: PropertyTableColumn | undefined = undefined
  ): PropertyTableColumn[] {
    const columns: PropertyTableColumn[] = [];
    for (const property of properties) {
      if (skipPropertyConfiguration(property)) continue;

      if (property.getDisableGroup(undefined, 'table')) {
        // Add children of disabled groups directly to the column list
        const disabledGroupColumns = generateColumns(property.flatGroup, parentColumn);
        if (!disabledGroupColumns.length) continue;
        columns.push(...disabledGroupColumns);

      } else {
        // Generate column from the current property
        const column = generateColumn(property, parentColumn);
        if (!column) continue;
        columns.push(column);
      }
    }
    return columns;
  }

  /**
   * Extracts visible columns from the given array of `PropertyTableColumn`s.
   * @param columns The array of `PropertyTableColumn`s to extract visible columns from.
   * @returns Subset of the given `columns` array where the `isVisible` property is true.
   */
  export function generateVisibleColumns(columns: PropertyTableColumn[]): PropertyTableColumn[] {
    if (!columns?.length) return [];

    const visibleColumns: PropertyTableColumn[] = [];

    for (const column of columns) {
      // Skip invisible columns
      if (!column.isVisible) continue;

      if (column.isGroup) {
        // Get visible child columns
        const visibleChildColumns = generateVisibleColumns(column.children);
        // Skip groups without visible children
        if (!visibleChildColumns.length) continue;

        // Create a duplicate of the column with only visible children
        const visibleColumn = column.cloneWithDifferentChildren(visibleChildColumns);
        visibleColumns.push(visibleColumn);

      } else {
        // Add visible column without children immediately to the array of visible columns
        visibleColumns.push(column);
      }
    }

    return visibleColumns;
  }

  /**
   * Computes the maximum depth of `PropertyTableColumn`s groups.
   * @param columns The array of `PropertyTableColumn`s to compute the depth for.
   * @returns The maximum depth of column groups.
   *          Returns `0` if the given columns array is empty.
   *          Returns `1` if the given columns array contains no groups.
   */
  export function computeMaxColumnGroupDepth(columns: PropertyTableColumn[]): number {
    if (!columns?.length) return 0;
    let maxDepth = 1;

    for (const column of columns) {
      if (!column.isGroup) continue;
      const currentDepth = 1 + computeMaxColumnGroupDepth(column.children);
      maxDepth = Math.max(maxDepth, currentDepth);
    }

    return maxDepth;
  }

}
