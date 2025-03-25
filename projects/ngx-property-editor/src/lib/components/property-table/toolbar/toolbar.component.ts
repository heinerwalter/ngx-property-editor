import { Component, Input } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';

/**
 * This component can be used as toolbar above a <pe-table> component or anywhere else.
 */
@Component({
  selector: 'pe-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

  /** ID attribute of the toolbar div element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

  /**
   * If true, the class `.table-bordered` is added which causes
   * a border to be displayed around the whole table.
   */
  @Input() public isBordered: boolean = false;
  /** Optional class added to the toolbar div element. */
  @Input() public toolbarClass: string | undefined = undefined;

  public constructor() {
  }

}
