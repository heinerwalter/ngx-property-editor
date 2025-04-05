import { PropertyConfiguration } from '../property-views/property-configuration';
import { PropertyTableColumnController } from './controller/property-table-column-controller';

/**
 * Definition of a column of the `PropertyTableComponent`.
 */
export class PropertyTableColumn {

  /**
   * The `PropertyConfiguration` from which this column has been generated.
   */
  public readonly property: PropertyConfiguration;

  /**
   * Determines whether this column is currently visible.
   * The visibility can be changed by the `ColumnChooserComponent`.
   */
  public isVisible: boolean;

  /**
   * Index of a visible column.
   *
   * This index can be used to change the order of the columns
   * within a group (or the first level colums without a group).
   * If two indices are equal, the columns are displayed in the
   * order of the columns array.
   */
  public index: number;

  // region Grouping

  /**
   * If this column is part of a group below a parent column,
   * a reference to the parent column is stored here.
   * Otherwise this property is `undefined`.
   */
  public readonly parent: PropertyTableColumn | undefined;

  /**
   * Indicates whether this column is the parent column of a group of child columns.
   * @returns `true` if `childrens` contains at least one element.
   * @see children
   */
  public get isGroup(): boolean {
    return this.children.length > 0;
  }

  /**
   * If this column is the parent column of a group of child columns
   * (`isGroup == true`), the child columns are stored in this property.
   * Otherwise, this property is an empty array.
   */
  public readonly children: PropertyTableColumn[] = [];

  /**
   * Returns the total number of child columns which are not groups themself.
   * This number contains nested child columns.
   * @see children
   * @see isGroup
   */
  public get totalChildrenCount(): number {
    let count = 0;
    for (const child of this.children) {
      if (child.isGroup) {
        count += child.totalChildrenCount;
      } else {
        count++;
      }
    }
    return count;
  }

  /**
   * Returns the maximum depth of column groups.
   * Returns `0` if this column has no children (`isGroup == false`).
   */
  public get maxGroupDepth(): number {
    return PropertyTableColumnController.computeMaxColumnGroupDepth(this.children);
  }

  // endregion

  constructor(
    property: PropertyConfiguration,
    isVisible: boolean,
    parent: PropertyTableColumn | undefined,
    index: number = 0
  ) {
    this.property = property;
    this.isVisible = isVisible;
    this.parent = parent;
    this.index = index;
  }

  /**
   * Clones this column and replaces the child columns with the given array of `PropertyTableColumn`s.
   * All other properties of the column are copied.
   * @param children The new child columns to be assigned to the cloned column.
   * @returns A new `PropertyTableColumn` object with the same properties as this column,
   *          but with the given child columns.
   */
  public cloneWithDifferentChildren(children: PropertyTableColumn[]): PropertyTableColumn {
    const column = new PropertyTableColumn(this.property, this.isVisible, this.parent);
    column.children.push(...children);
    return column;
  }

}
