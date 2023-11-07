import { Component, Input } from '@angular/core';
import { InputBaseWithValue } from '../input-base';

@Component({
  selector: 'pe-text-area-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['./text-area-input.component.scss'],
})
export class TextAreaInputComponent extends InputBaseWithValue<string> {

  /** Height of the textarea element (number of rows; HTML textarea attribute "rows"). */
  @Input() public height: number | undefined = undefined;

  public constructor() {
    super();
  }

}
