import { Type } from '@angular/core';
import { inputComponents } from './input/input.components';
import { propertyViewComponents } from './property-views/property-views.components';

export const components: Array<Type<any> | any[]> = [
  ...inputComponents,
  ...propertyViewComponents,
];
