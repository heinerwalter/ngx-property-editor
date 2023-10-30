import { Component, Input } from '@angular/core';
import { InputBaseWithValue } from '../input-base';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
})
export class NumberInputComponent extends InputBaseWithValue<number> {

  @Input() min: number | undefined = undefined;
  @Input() max: number | undefined = undefined;
  @Input() step: number | undefined = 1;

  constructor() {
    super();
  }

}
