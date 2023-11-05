import { Component } from '@angular/core';
import { ItemViewItemBaseComponent } from '../item-view-item-base.component';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'pe-tabs-item',
  template: ItemViewItemBaseComponent.template,
})
export class TabsItemComponent extends ItemViewItemBaseComponent {

  public constructor(itemViewComponentRef: TabsComponent) {
    super(itemViewComponentRef);
  }

}
