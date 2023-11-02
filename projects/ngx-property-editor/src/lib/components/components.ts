import { Type } from '@angular/core';
import { bootstrapComponents } from './bootstrap/bootstrap.components';
import { inputComponents } from './input/input.components';
import { propertyViewComponents } from './property-views/property-views.components';
import { iconComponents } from './icon/icon.components';

export const components: Array<Type<any> | any[]> = [
  ...bootstrapComponents,
  ...iconComponents,
  ...inputComponents,
  ...propertyViewComponents,
];
