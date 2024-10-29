import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InputBaseWithValue } from '../input-base';

type RadioInputDataSourceOption = { value: boolean | undefined, name: string };


@Component({
  selector: 'pe-boolean-input',
  templateUrl: './boolean-input.component.html',
  styleUrls: ['./boolean-input.component.scss'],
})
export class BooleanInputComponent extends InputBaseWithValue<boolean> implements OnChanges {

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

  protected yesOption: RadioInputDataSourceOption = { value: true, name: 'Ja' };
  protected noOption: RadioInputDataSourceOption = { value: false, name: 'Nein' };
  protected indeterminateOption: RadioInputDataSourceOption = { value: undefined, name: 'Keine Angabe' };

  /** Returns a data source for the radio input component based on the input properties of this component. */
  protected radioInputDataSource: RadioInputDataSourceOption[] = [this.yesOption, this.noOption];

  // endregion

  public constructor() {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    let updateRadioInputDataSource: boolean = false;
    if (changes.hasOwnProperty('yesLabel')) {
      this.yesOption = { value: true, name: this.yesLabel || 'Ja' };
      updateRadioInputDataSource = true;
    }
    if (changes.hasOwnProperty('noLabel')) {
      this.noOption = { value: false, name: this.noLabel || 'Nein' };
      updateRadioInputDataSource = true;
    }
    if (changes.hasOwnProperty('indeterminateLabel')) {
      this.indeterminateOption = { value: undefined, name: this.indeterminateLabel || 'Keine Angabe' };
      updateRadioInputDataSource = true;
    }

    if (changes.hasOwnProperty('allowIndeterminate') || updateRadioInputDataSource) {
      if (!this.allowIndeterminate)
        this.radioInputDataSource = [this.yesOption, this.noOption];
      else
        this.radioInputDataSource = [this.yesOption, this.noOption, this.indeterminateOption];
    }
  }

}
