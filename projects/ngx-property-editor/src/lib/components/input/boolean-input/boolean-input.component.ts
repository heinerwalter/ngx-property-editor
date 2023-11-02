import { Component, Input } from '@angular/core';
import { InputBaseWithValue } from '../input-base';

@Component({
  selector: 'pe-boolean-input',
  templateUrl: './boolean-input.component.html',
  styleUrls: ['./boolean-input.component.scss'],
})
export class BooleanInputComponent extends InputBaseWithValue<boolean> {

  /**
   * Choose how to display the boolean input:
   * - 'checkbox': As checkbox with default style.
   * - 'switch': As checkbox with bootstrap switch style.
   * - 'radio': As radio group with yes and no options.
   */
  @Input() type: 'checkbox' | 'switch' | 'radio' = 'radio';

  /**
   * If true and the `value` is undefined, the checkbox will display an indeterminate state.
   * If false and the `value` is undefined, the checkbox will display a false state (same as `value = false`).
   */
  @Input() allowIndeterminate: boolean = false;

  constructor() {
    super();
  }

}
