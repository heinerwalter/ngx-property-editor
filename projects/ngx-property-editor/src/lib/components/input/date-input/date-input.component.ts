import { Component, Input } from '@angular/core';
import { InputBaseWithValue } from '../input-base';
import { Stringifier } from '../../../controller/stringifier';

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
    /** Defines a date and time control (year, month, day, time (no timezone)). */
    'datetime-local' |
    /** Defines a month and year control (no timezone). */
    'month' |
    /** Defines a control for entering a time (no timezone). */
    'time' |
    /** Defines a week and year control (no timezone). */
    'week' = 'date';

  /**
   * Choose whether to return the selected date within UTC (default) or local timezone.
   */
  @Input() timezone: 'utc' | 'local' = 'utc';

  public constructor() {
    super();
  }

  protected onInputChange(event: Event): void {
    let date: Date | undefined = (event?.target as HTMLInputElement)?.valueAsDate || undefined;
    if (this.timezone == 'local' && date) {
      date = Stringifier.dateUTCToTimezone(date);
    }
    this.value = date;
    this.emitValueChange(date);
  }

}
