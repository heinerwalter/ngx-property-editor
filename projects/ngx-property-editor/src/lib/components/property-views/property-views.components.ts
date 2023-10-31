import { Type } from '@angular/core';
import { ViewAndEditContainerComponent } from './view-and-edit-container/view-and-edit-container.component';
import { PropertyEditorComponent } from './property-editor/property-editor.component';
import { PropertyInputComponent } from './property-input/property-input.component';
import { PropertyTableComponent } from './property-table/property-table.component';
import { PropertyViewAndEditComponent } from './property-view-and-edit/property-view-and-edit.component';
import { TableComponent } from './table/table.component';

export const propertyViewComponents: Array<Type<any> | any[]> = [
  ViewAndEditContainerComponent,
  PropertyEditorComponent,
  PropertyInputComponent,
  PropertyTableComponent,
  PropertyViewAndEditComponent,
  TableComponent,
];
