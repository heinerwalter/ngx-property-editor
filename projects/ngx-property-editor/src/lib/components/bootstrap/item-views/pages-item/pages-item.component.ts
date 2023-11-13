import { Component } from '@angular/core';
import { ItemViewItemBaseComponent } from "../item-view-item-base.component";
import { PagesComponent } from "../pages/pages.component";

@Component({
  selector: 'pe-pages-item',
  template: ItemViewItemBaseComponent.template,
})
export class PagesItemComponent extends ItemViewItemBaseComponent {

  public constructor(itemViewComponentRef: PagesComponent) {
    super(itemViewComponentRef);
  }

}
