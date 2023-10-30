import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { components } from './components/components';


@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    FormsModule,
  ],
  exports: [
    ...components,
  ]
})
export class PropertyEditorModule { }
