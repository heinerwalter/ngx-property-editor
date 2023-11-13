import { Component, Input } from '@angular/core';
import { InputBaseWithValue } from '../input-base';

@Component({
  selector: 'pe-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
})
export class DateInputComponent extends InputBaseWithValue<Date> {

  /** Defines the type of the HTML input element. Default: 'text'. */
  @Input() public type:
    /** Defines a date control (year, month, day (no time)). */
    'date' |
    /** Defines a date and time control (year, month, day, time (no timezone). */
    'datetime-local' |
    /** Defines a month and year control (no timezone). */
    'month' |
    /** Defines a control for entering a time (no timezone). */
    'time' |
    /** Defines a week and year control (no timezone). */
    'week' = 'date';

  public constructor() {
    super();
  }

  protected onInputChange(event: Event): void {
    this.value = (event?.target as HTMLInputElement)?.valueAsDate || undefined;
    this.emitValueChange(this.value);
  }

}
