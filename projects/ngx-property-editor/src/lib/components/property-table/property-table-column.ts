import { PropertyConfiguration } from '../property-views/property-configuration';

/**
 * Definition of a column of the `PropertyTableComponent`.
 */
export type PropertyTableColumn = {

  /**
   * The `PropertyConfiguration` from which this column has been generated.
   */
  property: PropertyConfiguration;

  /**
   * Determines whether this column is currently visible.
   * The visibility can be changed by the `ColumnChooserComponent`.
   */
  isVisible: boolean;

  // region Grouping

  /**
   * If this column is part of a group below a parent column,
   * a reference to the parent column is stored here.
   * Otherwise this property is `undefined`.
   */
  parent: PropertyTableColumn | undefined;

  /**
   * Indicates whether this column is the parent column of a group of child columns.
   * @see children
   */
  isGroup: boolean;

  /**
   * If this column is the parent column of a group of child columns
   * (`isGroup == true`), the child columns are stored in this property.
   * Otherwise, this property is an empty array.
   */
  children: PropertyTableColumn[];

  // endregion

};
