import { Type } from '@angular/core';
import { PropertyTableComponent } from './property-table/property-table.component';
import { TableComponent } from './table/table.component';
import { TableColumnChooserComponent } from './table-column-chooser/table-column-chooser.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

export const propertyTableComponents: Array<Type<any> | any[]> = [
  PropertyTableComponent,
  TableComponent,
  TableColumnChooserComponent,
  ToolbarComponent,
];
