import { Component, Input } from '@angular/core';
import { InputBaseWithValue } from '../input-base';

@Component({
  selector: 'npe-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
})
export class NumberInputComponent extends InputBaseWithValue<number> {

  /** Smallest allowed numeric value or undefined to allow any value. */
  @Input() min: number | undefined = undefined;
  /** Largest allowed numeric value or undefined to allow any value. */
  @Input() max: number | undefined = undefined;

  /** The up and down buttons change the value with this step size. */
  @Input() step: number | undefined = 1;

  constructor() {
    super();
  }

}
