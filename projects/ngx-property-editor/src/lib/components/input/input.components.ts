import { Type } from '@angular/core';
import { ArrayFormGroupComponent } from './array-form-group/array-form-group.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormTextComponent } from './form-text/form-text.component';
import { InputGroupComponent } from './input-group/input-group.component';
import { InputGroupTextComponent } from './input-group-text/input-group-text.component';

import { specialInputComponents } from './special-input/special-input.components';

import { BooleanInputComponent } from './boolean-input/boolean-input.component';
import { ButtonInputComponent } from './button-input/button-input.component';
import { CheckboxSelectInputComponent } from './checkbox-select-input/checkbox-select-input.component';
import { CodeInputComponent } from './code-input/code-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { DifficultyInputComponent } from './difficulty-input/difficulty-input.component';
import { FileInputComponent } from './file-input/file-input.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { RadioInputComponent } from './radio-input/radio-input.component';
import { RatingInputComponent } from './rating-input/rating-input.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { SelectInputWithIconComponent } from './select-input-with-icon/select-input-with-icon.component';
import { SingleRadioInputComponent } from './single-radio-input/single-radio-input.component';
import { TextAreaInputComponent } from './text-area-input/text-area-input.component';
import { TextInputComponent } from './text-input/text-input.component';
import { DropdownInputComponent } from './dropdown-input/dropdown-input.component';

export const inputComponents: Array<Type<any> | any[]> = [
  ArrayFormGroupComponent,
  FormGroupComponent,
  FormTextComponent,
  InputGroupComponent,
  InputGroupTextComponent,

  ...specialInputComponents,

  BooleanInputComponent,
  ButtonInputComponent,
  CheckboxSelectInputComponent,
  CodeInputComponent,
  DateInputComponent,
  DifficultyInputComponent,
  DropdownInputComponent,
  FileInputComponent,
  NumberInputComponent,
  RadioInputComponent,
  RatingInputComponent,
  SelectInputComponent,
  SelectInputWithIconComponent,
  SingleRadioInputComponent,
  TextAreaInputComponent,
  TextInputComponent,
];
