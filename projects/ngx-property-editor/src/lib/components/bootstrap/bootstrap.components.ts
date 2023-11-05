import { Type } from '@angular/core';
import { itemViewComponents } from './item-views/item-views.components';
import { ColumnComponent } from './column/column.component';
import { RowComponent } from './row/row.component';

export const bootstrapComponents: Array<Type<any> | any[]> = [
  ...itemViewComponents,
  ColumnComponent,
  RowComponent,
];
