import { Type } from '@angular/core';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { AccordionComponent } from './accordion/accordion.component';
import { TabsItemComponent } from './tabs-item/tabs-item.component';
import { TabsComponent } from './tabs/tabs.component';

export const itemViewComponents: Array<Type<any> | any[]> = [
  AccordionComponent,
  AccordionItemComponent,
  TabsComponent,
  TabsItemComponent,
];
