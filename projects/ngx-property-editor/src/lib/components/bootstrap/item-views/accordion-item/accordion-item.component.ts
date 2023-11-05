import { Component } from '@angular/core';
import { AccordionComponent } from '../accordion/accordion.component';
import { ItemViewItemBaseComponent } from '../item-view-item-base.component';

@Component({
  selector: 'pe-accordion-item',
  template: ItemViewItemBaseComponent.template,
})
export class AccordionItemComponent extends ItemViewItemBaseComponent {

  public constructor(itemViewComponentRef: AccordionComponent) {
    super(itemViewComponentRef);
  }

}
