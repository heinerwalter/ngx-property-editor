import { PropertyConfiguration } from '../property-views/property-configuration';

/**
 * Decide whether a table cell should be displayed as
 * `<td>` (`'data'`) or `<th>` (`'header'`).
 */
export type TableCellElementType = 'data' | 'header';

/**
 * Base definition of each single table cell (header and content).
 */
type TableCellBase = {
  /** Cell element type (default: `'data'`). */
  elementType?: TableCellElementType,

  /**
   * Cell content.
   *
   * If a `propertyConfiguration` is defined, the given `content` is displayed
   * using the `propertyConfiguration`. Otherwise it is simply stringified.
   */
  content?: string | any,
  /** Optional property configuration used to display the `content`. */
  propertyConfiguration?: PropertyConfiguration | undefined,
  /**
   * If true and a `propertyConfiguration` is defined, a <pe-property-input>
   * element is displayed inside the cell for editing of the cell content.
   */
  showPropertyInput?: boolean | undefined,
  /**
   * If a <pe-property-input> element is displayed inside the cell
   * and the user changed the input value, this function is called.
   * @see showPropertyInput
   */
  onPropertyInputValueChanged?: ((newValue: any) => void) | undefined,

  /** Optional cell element CSS class. */
  class?: string | undefined,
  /** Optional cell element CSS style. */
  style?: string | undefined,
  /** Optional colspan attribute value. */
  colspan?: number | undefined,
  /** Optional rowspan attribute value. */
  rowspan?: number | undefined,

  /** If defined, a goto-icon with this link is appended to the cell content. */
  routerLink?: any[] | string | undefined,
  /**
   * If true, the `routerLink` is considered as pointing to an external web page.
   * In that case `routerLink` must be a string.
   */
  routerLinkIsExternal?: boolean | undefined,
  /** Optional tooltip of the goto-icon (see `routerLink`). */
  routerLinkTooltip?: string | undefined,
}

/**
 * Definition of a single table header cell.
 */
export type TableHeaderCell = TableCellBase & {
};

/**
 * Definition of a single table content cell.
 */
export type TableCell = TableCellBase & {
};

/**
 * Definition of a table header row as array of cell contents.
 */
export type TableHeaderRow = TableHeaderCell[];

/**
 * Definition of a table header as array of rows and
 * each row as array of cell contents.
 * Usually a table has only one header row.
 */
export type TableHeader = TableHeaderRow[];

/**
 * Definition of a table content row as array of cell contents.
 */
export type TableRow = TableCell[];

/**
 * Definition of a table content as array of rows and
 * each row as array of cell contents.
 * Add an empty row array to insert a separator between two rows.
 */
export type TableData = TableRow[];
