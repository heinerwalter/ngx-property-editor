import { Type } from '@angular/core';
import { ColumnComponent } from './column/column.component';
import { RowComponent } from './row/row.component';

export const bootstrapComponents: Array<Type<any> | any[]> = [
  ColumnComponent,
  RowComponent,
];
