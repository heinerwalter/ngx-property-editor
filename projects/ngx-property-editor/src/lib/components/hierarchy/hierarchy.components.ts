import { Type } from '@angular/core';
import {DragDropHandleComponent} from "./drag-drop-handle/drag-drop-handle.component";
import {HierarchyInputComponent} from "./hierarchy-input/hierarchy-input.component";

export const hierarchyComponents: Array<Type<any> | any[]> = [
  DragDropHandleComponent,
  HierarchyInputComponent,
];
