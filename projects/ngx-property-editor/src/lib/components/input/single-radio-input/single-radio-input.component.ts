import { Component, Input } from '@angular/core';
import { InputBaseWithValueAndDataSource } from '../input-base';

@Component({
  selector: 'app-single-radio-input',
  templateUrl: './single-radio-input.component.html',
  styleUrls: ['./single-radio-input.component.scss'],
})
export class SingleRadioInputComponent extends InputBaseWithValueAndDataSource<any> {

  /**
   * The value of this one radio input which will be assigned to `value`,
   * if this one radio input is selected.
   */
  @Input() option: any = undefined;

  /** If true, the radio input is displayed inline. */
  @Input() inline: boolean = false;

  constructor() {
    super();
  }

}
