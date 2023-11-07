import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PEGlobalFunctions } from '../../controller/pe-global-functions';

@Component({
  template: '',
})
export class InputBase {

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

  /** If true, the input element is not wrapped inside a form group component. */
  @Input() public noFormGroup: boolean = false;

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
  public emitValueChange(newValue: T | undefined): void {
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
  @Input() public dataSource: { [key: string]: any }[] = [];

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
   */
  public evaluateValuePropertyName(item: { [key: string]: any }): any {
    return PEGlobalFunctions.evaluateValuePropertyName(this.valuePropertyName, item);
  }

  /**
   * Evaluates the `displayPropertyName` on the given data source item.
   * @param item An item of the `dataSource`.
   */
  public evaluateDisplayPropertyName(item: { [key: string]: any }): string {
    return PEGlobalFunctions.evaluateDisplayPropertyName(this.displayPropertyName, item);
  }

}
