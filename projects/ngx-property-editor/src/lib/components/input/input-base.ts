import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { PEGlobalFunctions } from '../../controller/pe-global-functions';

@Component({
  template: '',
})
export class InputBase {

  /** Add class `.pe-input` to all input components. */
  @HostBinding('class.pe-input')
  protected readonly addInputClass: boolean = true;

  /** ID attribute of the input element (required if a label is defined). */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();
  /** Name attribute of the input element. */
  @Input() public name: string | undefined = undefined;
  /**
   * Only if a form group component is added (`noFormGroup == false`):
   * If not empty a label is displayed at the top of this form group.
   */
  @Input() public label: string | undefined = undefined;
  /** If not empty a placeholder is displayed in the input field. */
  @Input() public placeholder: string | undefined = undefined;
  /**
   * Only if a form group component is added (`noFormGroup == false`):
   * If true, label and content are displayed in a grid in one line.
   */
  @Input() public inlineLabel: boolean = false;
  /**
   * Only if a form group component is added (`noFormGroup == false`):
   * If not empty, an `InfoIconComponent` is added to the end of the label with this text as tooltip.
   */
  @Input() public infoIconTooltip: string | undefined = undefined;
  /**
   * Only if a form group component is added (`noFormGroup == false`):
   * If not empty, a `FormTextComponent` is added below the input element with this text as content.
   */
  @Input() public helpText: string | undefined = undefined;

  /** If true, the value cannot be changed by the user. */
  @Input() public disabled: boolean = false;
  /** If true, the value is displayed as usual (not grey/disabled) but the user cannot change it. */
  @Input() public readonly: boolean = false;
  /** If true, an empty value is not valid. */
  @Input() public required: boolean = false;

  /**
   * Apply bootstrap validation style to the input element.
   * If `true`, the input element is styled with green border.
   * If `false`, the input element is styled with red border.
   * If `undefined`, validation is not applied to the input element (default style).
   */
  @Input() public isValid: boolean | undefined = undefined;
  /**
   * Only if a form group component is added (`noFormGroup == false`):
   * If not empty, this text is displayed below the input element (like the `helpText`)
   * when the entered value is marked as valid (`isValid == true`).
   */
  @Input() public validFeedback: string | undefined = undefined;
  /**
   * Only if a form group component is added (`noFormGroup == false`):
   * If not empty, this text is displayed below the input element (like the `helpText`)
   * when the entered value is marked as invalid (`isValid == false`).
   */
  @Input() public invalidFeedback: string | undefined = undefined;
  /**
   * Only if a form group component is added (`noFormGroup == false`):
   * If false (default), the validity feedback texts (`validFeedback` and `invalidFeedback`)
   * are displayed as block element below the content (input element) like the `helpText`.
   * If true, the validity feedback texts are displayed as tooltip (not recommended!).
   */
  @Input() public validityFeedbackAsTooltip: boolean = false;

  /** If true, the input element is not wrapped inside a form group component. */
  @Input() public noFormGroup: boolean = false;

  /** CSS attribute flex-grow of this input element (default value: 1). */
  @HostBinding('style.flex-grow')
  @Input() public flexGrow: number | undefined = 1;

}

@Component({
  template: '',
})
export class InputBaseWithValue<T> extends InputBase {

  /** The entered value. */
  @Input() public value: T | undefined = undefined;

  /**
   * This event is triggered when the user changed the entered value.
   * The new value is passed as event argument.
   */
  @Output() public readonly valueChange: EventEmitter<T> = new EventEmitter<T>();

  /**
   * Triggers the valueChange event with the given new value as event argument.
   * @param newValue The new entered value.
   */
  protected emitValueChange(newValue: T | undefined): void {
    // Change is not possible, if disabled or readonly
    if (this.disabled || this.readonly) return;
    this.valueChange.emit(newValue);
  }

}

@Component({
  template: '',
})
export class InputBaseWithValueAndDataSource<TValue, TDataSource = any> extends InputBaseWithValue<TValue> {

  /**
   * An array from which the user can select one or multiple items.
   */
  @Input() public dataSource: any[] = [];

  /**
   * Evaluate this property name on the data source items
   * to get the values of the select input element items.
   * If undefined, the whole data source item is used as value.
   */
  @Input() public valuePropertyName: string | undefined = undefined;

  /**
   * Evaluate this property name on the data source items
   * to get a string which is displayed on the select input element items.
   * If undefined, the whole data source item is used as display value.
   */
  @Input() public displayPropertyName: string | undefined = undefined;

  /**
   * Evaluates the `valuePropertyName` on the given data source item.
   * @param item An item of the `dataSource`.
   * @param valuePropertyName Optional: If not empty, use this value property name
   *                          instead of the class property `valuePropertyName`.
   */
  public evaluateValuePropertyName(item: any, valuePropertyName: string | undefined = undefined): any {
    return PEGlobalFunctions.evaluateValuePropertyName(valuePropertyName || this.valuePropertyName, item);
  }

  /**
   * Evaluates the `displayPropertyName` on the given data source item.
   * @param item An item of the `dataSource`.
   * @param displayPropertyName Optional: If not empty, use this display property name
   *                            instead of the class property `displayPropertyName`.
   */
  public evaluateDisplayPropertyName(item: any, displayPropertyName: string | undefined = undefined): string {
    return PEGlobalFunctions.evaluateDisplayPropertyName(displayPropertyName || this.displayPropertyName, item);
  }

}
