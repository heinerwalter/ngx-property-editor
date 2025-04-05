import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { Stringifier } from '../../../controller/stringifier';
import { TableHeader, TableCell, TableData } from '../table-configuration';

/**
 * This component builds an HTML table element with bootstrap style
 * from an array of table `data`.
 */
@Component({
  selector: 'pe-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnChanges {

  /** ID attribute of the table element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

  /**
   * If true, a container with class `table-responsive` is added around the table element,
   * which causes the table to be horizontally scrollable, if its too wide.
   */
  @Input() public addResponsiveContainer: boolean = false;
  /**
   * Only if `addResponsiveContainer` is true:
   * Optional class added to the responsive container element.
   */
  @Input() public responsiveContainerClass: string | undefined = undefined;

  /**
   * If true, the class `.table-striped` is added which causes
   * alternating row colors.
   */
  @Input() public isStriped: boolean = false;
  /**
   * If true, the class `.table-bordered` is added which causes
   * a border to be displayed around the whole table.
   */
  @Input() public isBordered: boolean = false;
  /**
   * If true, the class `.table-striped` is added which causes
   * hovered rows to be highlighted.
   */
  @Input() public isHover: boolean = true;
  /** Optional class added to the table element. */
  @Input() public tableClass: string | undefined = undefined;

  /**
   * This array contains the table header.
   * Each element is a cell of the header row.
   * If empty, no header is displayed.
   */
  @Input() public header: TableHeader = [];

  /**
   * This two-dimensional array contains the table data.
   * The first dimension contains the table rows.
   * The second dimension contains the cells of a row.
   *
   * Each cell contains its `content` as string and an additional
   * `style` property defining how the cell is displayed:
   * - 'data': The cell is displayed as data (<td>).
   *           If a cell is given as simple string, this style is used.
   * - 'header': The cell is displayed as header (<th>).
   */
  @Input() public data: TableData = [];

  /** If true, pagination is activated. */
  @Input() public pagination: boolean = false;
  /**
   * Only if `pagination` is true:
   * Show this many `data` rows on one page.
   */
  @Input() public pageSize: number = 10;
  /**
   * Only if `pagination` is true:
   * The current page number (starting with 1).
   */
  protected currentPage: number = 1;

  /**
   * Only if `pagination` is true:
   * Number of available pages.
   */
  protected get pageCount(): number {
    return Math.ceil(this.data?.length / this.pageSize);
  }

  /**
   * If `pagination` is true, this property returns the currently visible subset of `data`.
   * Otherwise, it returns `data`.
   */
  protected get pageData(): TableData {
    if (!this.data) return [];
    if (!this.pagination) return this.data;

    const startIndex: number = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(startIndex, startIndex + this.pageSize);
  }

  /**
   * If true, for cells with a defined `propertyConfiguration` and `showPropertyInput == undefined`
   * a <pe-property-input> element is displayed inside the cell for editing of the cell content.
   */
  @Input() public showPropertyInput: boolean = false;

  public constructor() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('data') ||
      changes.hasOwnProperty('pageSize')) {
      if (this.pageSize <= 0)
        this.pageSize = 10;
      if (this.currentPage < 1)
        this.currentPage = 1;
      const pageCount = this.pageCount;
      if (this.currentPage > pageCount)
        this.currentPage = pageCount;
    }
  }

  /**
   * Returns true, if a <pe-property-input> element should be displayed inside
   * the given cell for editing of the cell content.
   * @param cell A table cell definition.
   */
  protected getShowPropertyInput(cell: TableCell): boolean {
    if (!cell?.propertyConfiguration)
      return false;
    if (typeof cell.showPropertyInput === 'boolean')
      return cell.showPropertyInput;
    return this.showPropertyInput &&
      cell.propertyConfiguration.isEditable(cell.content, 'table');
  }

  /**
   * Converts the `content` of a table cell to string.
   * @param cell A table cell definition.
   * @returns The table cell content as string.
   */
  protected getContent(cell: TableCell): string {
    if (cell?.propertyConfiguration) {
      return (cell.propertyConfiguration.getDisplayValue(cell.content, 'table', true) || '') as string;
    }

    if (Array.isArray(cell?.content))
      return cell?.content
        .map(item => Stringifier.anyTypeToString(item))
        .join('\n');
    return Stringifier.anyTypeToString(cell?.content);
  }

}
