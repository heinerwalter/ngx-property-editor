import { PropertyConfiguration } from '../property-views/property-configuration';
import { PropertyTableColumnController } from './controller/property-table-column-controller';


/**
 * Possible values of special columns of the `PropertyTableComponent`.
 */
export type SpecialPropertyTableColumnType =
/** A column with checkboxes for selecting rows. */
  'selection' |
  /** A column with multiple buttons for deleting, editing or custom use cases. */
  'buttons';


/**
 * Definition of a column of the `PropertyTableComponent`.
 */
export class PropertyTableColumn {

  /**
   * The `PropertyConfiguration` from which this column has been generated.
   */
  public readonly property: PropertyConfiguration;

  /**
   * If this column is not related to a `PropertyConfiguration` but has a special use case,
   * the `SpecialPropertyTableColumnType` is defined here. In that case the property
   * configuration (`property`) is meaningless.
   */
  public readonly specialType: SpecialPropertyTableColumnType | undefined;

  /**
   * Determines whether this column is currently visible.
   * The visibility can be changed by the `ColumnChooserComponent`.
   */
  public isVisible: boolean;

  /**
   * Index of a visible column.
   *
   * This index can be used to change the order of the columns
   * within a group (or the first level columns without a group).
   * If two indices are equal, the columns are displayed in the
   * order of the columns array.
   */
  public order: number;

  /**
   * Determines whether this column is hidden in the column chooser
   * (visibility not changeable by the user).
   */
  public hideInColumnChooser: boolean;

  /**
   * Determines whether the filter row cell of this column is hidden
   * (not filterable by the user).
   */
  public hideFilter: boolean;

  // region Grouping

  /**
   * If this column is part of a group below a parent column,
   * a reference to the parent column is stored here.
   * Otherwise, this property is `undefined`.
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

  /**
   * Constructor creating a new `PropertyTableColumn` object with the given properties.
   * @param property The `PropertyConfiguration` from which this column has been generated.
   * @param params Initialization of other properties of this class.
   */
  public constructor(
    property: PropertyConfiguration,
    params?: {
      specialType?: SpecialPropertyTableColumnType | undefined,
      isVisible?: boolean,
      index?: number,
      hideInColumnChooser?: boolean,
      hideFilter?: boolean,
      parent?: PropertyTableColumn | undefined,
    }) {
    this.property = property;

    this.specialType = params?.specialType;
    this.isVisible = params?.isVisible ?? true;
    this.order = params?.index ?? 0;
    this.hideInColumnChooser = params?.hideInColumnChooser ?? false;
    this.hideFilter = params?.hideFilter ?? false;
    this.parent = params?.parent;
  }

  /**
   * Creates a new `PropertyTableColumn` object with special column type and without
   * a `PropertyConfiguration` (a dummy `PropertyConfiguration` object is created).
   * @param specialType Type of the special property table column.
   * @param index Index of a visible column.
   * @param parent Reference to the parent column for a column which is part of a group below the parent column.
   *               Usually, this property is `undefined` (no group) for special columns.
   */
  public static createSpecialColumn(
    specialType: SpecialPropertyTableColumnType,
    index: number = 0,
    parent: PropertyTableColumn | undefined = undefined,
  ): PropertyTableColumn {
    // Create a new PropertyTableColumn object with a dummy PropertyConfiguration object
    return new PropertyTableColumn(
      new PropertyConfiguration(),
      {
        specialType: specialType,
        isVisible: true,
        index: index,
        hideInColumnChooser: true,
        hideFilter: true,
        parent: parent,
      });
  }

  /**
   * Clones this column and replaces the child columns with the given array of `PropertyTableColumn`s.
   * All other properties of the column are copied.
   * @param children The new child columns to be assigned to the cloned column.
   * @returns A new `PropertyTableColumn` object with the same properties as this column,
   *          but with the given child columns.
   */
  public cloneWithDifferentChildren(children: PropertyTableColumn[]): PropertyTableColumn {
    const column = new PropertyTableColumn(
      this.property,
      {
        specialType: this.specialType,
        isVisible: this.isVisible,
        index: this.order,
        hideInColumnChooser: this.hideInColumnChooser,
        hideFilter: this.hideFilter,
        parent: this.parent,
      });

    column.children.push(...children);
    return column;
  }

}
