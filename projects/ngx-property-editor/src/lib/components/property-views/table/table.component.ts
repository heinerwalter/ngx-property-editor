import { Component, Input } from '@angular/core';
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
})
export class TableComponent {

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

  /**
   * Converts the `content` of a table cell to string.
   * @see TableCell.content
   */
  protected getContent(cell: TableCell): string {
    if (Array.isArray(cell?.content))
      return cell?.content
        .map(item => Stringifier.anyTypeToString(item))
        .join('\n');
    return Stringifier.anyTypeToString(cell?.content);
  }

}
