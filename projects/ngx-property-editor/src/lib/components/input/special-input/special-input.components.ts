import { Type } from '@angular/core';
import { ColorSelectInputComponent } from './color-select-input/color-select-input.component';
import { IconSelectInputComponent } from './icon-select-input/icon-select-input.component';

export const specialInputComponents: Array<Type<any> | any[]> = [
  ColorSelectInputComponent,
  IconSelectInputComponent,
];
