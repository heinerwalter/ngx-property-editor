import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ItemViewBaseComponent } from '../item-view-base.component';

@Component({
  selector: 'pe-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent extends ItemViewBaseComponent {

  /**
   * Show the tab buttons horizontally above the tab content
   * or vertically beside the tab content.
   */
  @Input() public orientation: 'horizontal' | 'vertical' = 'horizontal';

  public constructor() {
    super();
  }

}
