import { Type } from '@angular/core';
import { itemViewComponents } from './item-views/item-views.components';
import { ButtonComponent } from './button/button.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { CollapseComponent } from './collapse/collapse.component';
import { ColumnComponent } from './column/column.component';
import { RowComponent } from './row/row.component';

export const bootstrapComponents: Array<Type<any> | any[]> = [
  ...itemViewComponents,
  ButtonComponent,
  ButtonGroupComponent,
  CollapseComponent,
  ColumnComponent,
  RowComponent,
];
