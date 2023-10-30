import { Component, Input } from '@angular/core';
import { InputBaseWithValueAndDataSource } from '../input-base';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.scss'],
})
export class RadioInputComponent extends InputBaseWithValueAndDataSource<any> {

  /** If true, the radio inputs are displayed inline. */
  @Input() inline: boolean = false;

  constructor() {
    super();
  }

}
