import { Component, Input } from '@angular/core';
import { InputBaseWithValueAndDataSource } from '../input-base';

@Component({
  selector: 'pe-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.scss'],
})
export class RadioInputComponent extends InputBaseWithValueAndDataSource<any> {

  /** If true, the radio inputs are displayed inline. */
  @Input() public inline: boolean = false;

  public constructor() {
    super();
  }

}
