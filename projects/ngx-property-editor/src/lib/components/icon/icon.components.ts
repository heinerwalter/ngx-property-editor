import { Type } from '@angular/core';
import { GotoIconComponent } from './goto-icon/goto-icon.component';
import { InfoIconComponent } from './info-icon/info-icon.component';
import { QuestionIconComponent } from './question-icon/question-icon.component';

export const iconComponents: Array<Type<any> | any[]> = [
  GotoIconComponent,
  InfoIconComponent,
  QuestionIconComponent,
];
