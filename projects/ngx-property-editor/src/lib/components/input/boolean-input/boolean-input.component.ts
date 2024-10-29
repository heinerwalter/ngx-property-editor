import { Component, Input } from '@angular/core';
import { InputBaseWithValue } from '../input-base';

type RadioInputDataSourceOption = { value: boolean | undefined, name: string };


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
  @Input() public type: 'checkbox' | 'switch' | 'radio' = 'radio';

  /**
   * If true and the `value` is undefined, the checkbox will display an indeterminate state.
   * If false and the `value` is undefined, the checkbox will display a false state (same as `value = false`).
   */
  @Input() public allowIndeterminate: boolean = false;

  // region Radio Input

  /**
   * Only if `type == 'radio'`:
   * Optional yes label used by the radio input. If undefined, the default label is used instead.
   */
  @Input() public yesLabel: string | undefined = undefined;
  /**
   * Only if `type == 'radio'`:
   * Optional no label used by the radio input. If undefined, the default label is used instead.
   */
  @Input() public noLabel: string | undefined = undefined;
  /**
   * Only if `type == 'radio'`:
   * Optional indeterminate label used by the radio input. If undefined, the default label is used instead.
   */
  @Input() public indeterminateLabel: string | undefined = undefined;

  /** Returns a data source for the radio input component based on the input properties of this component. */
  protected get radioInputDataSource(): RadioInputDataSourceOption[] {
    const yesOption: RadioInputDataSourceOption = { value: true, name: this.yesLabel || 'Ja' };
    const noOption: RadioInputDataSourceOption = { value: false, name: this.noLabel || 'Nein' };
    if (!this.allowIndeterminate)
      return [yesOption, noOption];

    const indeterminateOption: RadioInputDataSourceOption = { value: undefined, name: this.indeterminateLabel || 'Keine Angabe' };
    return [yesOption, noOption, indeterminateOption];
  }

  // endregion

  public constructor() {
    super();
  }

}
