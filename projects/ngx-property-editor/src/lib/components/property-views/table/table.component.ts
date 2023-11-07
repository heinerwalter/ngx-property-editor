import { Component, Input } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { Stringifier } from '../../../controller/stringifier';
import { TableData, TableCell } from '../table-configuration';

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
   * This array contains the table header.
   * Each element is a cell of the header row.
   * If empty, no header is displayed.
   */
  @Input() public header: string[] = [];

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

  public getContent(cell: TableCell): any {
    if (cell.content == undefined) {
      return '';
    } else if (typeof cell.content === 'boolean') {
      return cell.content ? 'Ja' : 'Nein';
    } else if (typeof cell.content === 'number') {
      if (isNaN(cell.content)) return '';
      return cell.content.toLocaleString();
    } else if (cell.content instanceof Date) {
      return Stringifier.dateToString(cell.content, true, 'auto');
    }
    return cell.content.toString();
  }

}
