import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { components } from './components/components';


@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ...components,
  ]
})
export class PropertyEditorModule { }
