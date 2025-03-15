import { Type } from '@angular/core';
import { ArrayFormGroupComponent } from './array-form-group/array-form-group.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormTextComponent } from './form-text/form-text.component';
import { InputGroupComponent } from './input-group/input-group.component';
import { InputGroupTextComponent } from './input-group-text/input-group-text.component';

import { InputBase, InputBaseWithValue, InputBaseWithValueAndDataSource } from './input-base';

import { specialInputComponents } from './special-input/special-input.components';

import { BooleanInputComponent } from './boolean-input/boolean-input.component';
import { CheckboxSelectInputComponent } from './checkbox-select-input/checkbox-select-input.component';
import { CodeInputComponent } from './code-input/code-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { DifficultyInputComponent } from './difficulty-input/difficulty-input.component';
import { FileInputComponent } from './file-input/file-input.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { RadioInputComponent } from './radio-input/radio-input.component';
import { RatingInputComponent } from './rating-input/rating-input.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { SingleRadioInputComponent } from './single-radio-input/single-radio-input.component';
import { TextAreaInputComponent } from './text-area-input/text-area-input.component';
import { TextInputComponent } from './text-input/text-input.component';
import { DropdownInputComponent } from './dropdown-input/dropdown-input.component';
import { LanguageInputComponent } from './language-input/language-input.component';
import { CountryInputComponent } from './country-input/country-input.component';

export const inputComponents: Array<Type<any> | any[]> = [
  ArrayFormGroupComponent,
  FormGroupComponent,
  FormTextComponent,
  InputGroupComponent,
  InputGroupTextComponent,

  InputBase,
  InputBaseWithValue,
  InputBaseWithValueAndDataSource,

  ...specialInputComponents,

  BooleanInputComponent,
  CheckboxSelectInputComponent,
  CodeInputComponent,
  CountryInputComponent,
  DateInputComponent,
  DifficultyInputComponent,
  DropdownInputComponent,
  FileInputComponent,
  LanguageInputComponent,
  NumberInputComponent,
  RadioInputComponent,
  RatingInputComponent,
  SelectInputComponent,
  SingleRadioInputComponent,
  TextAreaInputComponent,
  TextInputComponent,
];
