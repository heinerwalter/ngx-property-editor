import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ItemViewWithStateSaveBaseComponent } from '../item-view-with-state-save-base.component';

@Component({
  selector: 'pe-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent extends ItemViewWithStateSaveBaseComponent {

  /**
   * If true, only one panel can be opened at a time.
   */
  @Input() public closeOthers: boolean = true;

  /**
   * You can choose to either keep or remove the DOM nodes
   * of the panels that are not opened.
   */
  @Input() public destroyOnHide: boolean = false;

  /**
   * By default, the first item is initially opened.
   * If this property is true, initially all items are collapsed.
   */
  @Input() public allCollapsedInitially: boolean = false;

  @Input() public override disableSaveLastActiveItem: boolean = true;

  public constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

}
