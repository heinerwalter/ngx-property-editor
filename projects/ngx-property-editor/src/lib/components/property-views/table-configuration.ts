export type TableCellStyle = 'data' | 'header';

export type TableCell = {
  /** Cell content. */
  content?: string | any,
  /** Cell style. */
  style: TableCellStyle,
  /** If defined, a goto-icon with this link is appended to the cell content. */
  routerLink?: any[] | string | undefined,
  /**
   * If true, the `routerLink` is considered as pointing to an external web page.
   * In that case `routerLink` must be a string.
   */
  routerLinkIsExternal?: boolean | undefined,
  /** Optional tooltip of the goto-icon (see `routerLink`). */
  routerLinkTooltip?: string | undefined,
};

/**
 * Define the table content as array of rows and
 * each row as array of cell contents.
 * Add an empty row array to insert a separator between two rows.
 */
export type TableData = TableCell[][];
