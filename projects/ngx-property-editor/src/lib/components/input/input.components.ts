import { Type } from '@angular/core';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormTextComponent } from './form-text/form-text.component';
import { MultiRowFormGroupComponent } from './multi-row-form-group/multi-row-form-group.component';

import { InputBase, InputBaseWithValue, InputBaseWithValueAndDataSource } from './input-base';

import { BooleanInputComponent } from './boolean-input/boolean-input.component';
import { CheckboxSelectInputComponent } from './checkbox-select-input/checkbox-select-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { FileInputComponent } from './file-input/file-input.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { RadioInputComponent } from './radio-input/radio-input.component';
import { RatingInputComponent } from './rating-input/rating-input.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { SingleRadioInputComponent } from './single-radio-input/single-radio-input.component';
import { TextAreaInputComponent } from './text-area-input/text-area-input.component';
import { TextInputComponent } from './text-input/text-input.component';

export const inputComponents: Array<Type<any> | any[]> = [
  FormGroupComponent,
  FormTextComponent,
  MultiRowFormGroupComponent,

  InputBase,
  InputBaseWithValue,
  InputBaseWithValueAndDataSource,

  BooleanInputComponent,
  CheckboxSelectInputComponent,
  DateInputComponent,
  FileInputComponent,
  NumberInputComponent,
  RadioInputComponent,
  RatingInputComponent,
  SelectInputComponent,
  SingleRadioInputComponent,
  TextAreaInputComponent,
  TextInputComponent,
];
