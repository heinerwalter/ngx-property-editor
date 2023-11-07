import { Component, Input } from '@angular/core';
import { InputBaseWithValueAndDataSource } from '../input-base';

@Component({
  selector: 'pe-single-radio-input',
  templateUrl: './single-radio-input.component.html',
  styleUrls: ['./single-radio-input.component.scss'],
})
export class SingleRadioInputComponent extends InputBaseWithValueAndDataSource<any> {

  /**
   * The value of this one radio input which will be assigned to `value`,
   * if this one radio input is selected.
   */
  @Input() public option: any = undefined;

  /** If true, the radio input is displayed inline. */
  @Input() public inline: boolean = false;

  public constructor() {
    super();
  }

}
