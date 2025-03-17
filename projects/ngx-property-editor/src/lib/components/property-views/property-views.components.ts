import { Type } from '@angular/core';
import { ViewAndEditContainerComponent } from './view-and-edit-container/view-and-edit-container.component';
import { PropertyEditorComponent } from './property-editor/property-editor.component';
import { PropertyInputComponent } from './property-input/property-input.component';
import { PropertyInputWithArrayComponent } from './property-input-with-array/property-input-with-array.component';
import {
  PropertyInputWithGroupComponent,
} from './property-input-with-group/property-input-with-group.component';
import { PropertyTableComponent } from './property-table/property-table.component';
import { PropertyViewComponent } from './property-view/property-view.component';
import { PropertyViewAndEditComponent } from './property-view-and-edit/property-view-and-edit.component';
import { TableComponent } from './table/table.component';
import { PropertyValueComponent } from './property-value/property-value.component';

export const propertyViewComponents: Array<Type<any> | any[]> = [
  ViewAndEditContainerComponent,
  PropertyEditorComponent,
  PropertyInputComponent,
  PropertyInputWithArrayComponent,
  PropertyInputWithGroupComponent,
  PropertyTableComponent,
  PropertyValueComponent,
  PropertyViewComponent,
  PropertyViewAndEditComponent,
  TableComponent,
];
