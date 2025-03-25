import { Type } from '@angular/core';
import { bootstrapComponents } from './bootstrap/bootstrap.components';
import { iconComponents } from './icon/icon.components';
import { inputComponents } from './input/input.components';
import { modalComponents } from './modal/modal.components';
import { propertyTableComponents } from './property-table/property-table.components';
import { propertyViewComponents } from './property-views/property-views.components';

export const components: Array<Type<any> | any[]> = [
  ...bootstrapComponents,
  ...iconComponents,
  ...inputComponents,
  ...modalComponents,
  ...propertyTableComponents,
  ...propertyViewComponents,
];
