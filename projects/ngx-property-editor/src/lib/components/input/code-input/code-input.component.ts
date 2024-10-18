import { Component } from '@angular/core';
import { TextAreaInputComponent } from '../text-area-input/text-area-input.component';

@Component({
  selector: 'pe-code-input',
  templateUrl: '../text-area-input/text-area-input.component.html',
  styleUrls: [
    '../text-area-input/text-area-input.component.scss',
    './code-input.component.scss',
  ],

})
export class CodeInputComponent extends TextAreaInputComponent {

  public override readonly defaultHeight: number = 10;

}
