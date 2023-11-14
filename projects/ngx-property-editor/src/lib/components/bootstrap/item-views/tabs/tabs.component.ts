import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ItemViewWithStateSaveBaseComponent } from '../item-view-with-state-save-base.component';

@Component({
  selector: 'pe-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent extends ItemViewWithStateSaveBaseComponent {

  /**
   * Show the tab buttons horizontally above the tab content
   * or vertically beside the tab content.
   */
  @Input() public orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * If true, the rounded corners of the bootstrap tab items are removed.
   */
  @Input() public noRoundCorners: boolean = false;

  /**
   * Only for `orientation == 'vertical'`:
   * Choose how the tabs should look like:
   * - 'pills': Separate buttons without border (the default Bootstrap style of vertical tabs).
   * - 'list':  A list (table like) of connected buttons with border (copied from Bootstrap style .nav-list-group).
   * - 'list-no-gap' (default): Like 'list' but without space between the tab buttons and the tab content.
   */
  @Input() public verticalTabStyle: 'pills' | 'list' | 'list-no-gap' = 'list';

  public constructor() {
    super();
  }

}
