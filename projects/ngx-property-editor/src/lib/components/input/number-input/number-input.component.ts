import { Component, HostBinding, Input } from '@angular/core';
import { InputBaseWithValue } from '../input-base';

@Component({
  selector: 'pe-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
})
export class NumberInputComponent extends InputBaseWithValue<number> {

  /** Smallest allowed numeric value or undefined to allow any value. */
  @Input() public min: number | undefined = undefined;
  /** Largest allowed numeric value or undefined to allow any value. */
  @Input() public max: number | undefined = undefined;

  /** The up and down buttons change the value with this step size. */
  @Input() public step: number | undefined = 1;

  /** CSS attribute flex-grow of this input element (default value of number inputs: 0). */
  @HostBinding('style.flex-grow')
  @Input() public override flexGrow: number | undefined = 0;

  public constructor() {
    super();
  }

}
