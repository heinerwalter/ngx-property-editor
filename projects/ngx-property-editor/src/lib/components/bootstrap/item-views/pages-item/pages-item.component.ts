import { Component, Input } from '@angular/core';
import { ItemViewItemBaseComponent } from '../item-view-item-base.component';
import { PagesComponent } from '../pages/pages.component';

@Component({
  selector: 'pe-pages-item',
  template: ItemViewItemBaseComponent.template,
})
export class PagesItemComponent extends ItemViewItemBaseComponent {

  /**
   * If true, this item is not accessible and the navigation buttons leading to this item are disabled.
   */
  @Input() public override hidden: boolean = false;

  public constructor(itemViewComponentRef: PagesComponent) {
    super(itemViewComponentRef);
  }

}
