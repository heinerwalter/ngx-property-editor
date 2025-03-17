/**
 * This interface declares the Angular @Input properties
 * of the abstract class `InputBase`.
 */
export interface IInputBaseProperties {

  /** ID attribute of the input element (required if a label is defined). */
  id: string;
  /** Name attribute of the input element. */
  name: string | undefined;
  /**
   * Only if a form group component is added (`noFormGroup == false`):
   * If not empty a label is displayed at the top of this form group.
   */
  label: string | undefined;
  /** If not empty a placeholder is displayed in the input field. */
  placeholder: string | undefined;
  /**
   * Only if a form group component is added (`noFormGroup == false`):
   * If not empty, an `InfoIconComponent` is added to the end of the label with this text as tooltip.
   */
  infoIconTooltip: string | undefined;
  /**
   * Only if a form group component is added (`noFormGroup == false`):
   * If not empty, a `FormTextComponent` is added below the input element with this text as content.
   */
  helpText: string | undefined;

  /** If true, the value cannot be changed by the user. */
  disabled: boolean;
  /** If true, the value is displayed as usual (not grey/disabled) but the user cannot change it. */
  readonly: boolean;
  /** If true, an empty value is not valid. */
  required: boolean;

  /**
   * Apply bootstrap validation style to the input element.
   * If `true`, the input element is styled with green border.
   * If `false`, the input element is styled with red border.
   * If `undefined`, validation is not applied to the input element (default style).
   */
  isValid: boolean | undefined;
  /**
   * Only if a form group component is added (`noFormGroup == false`):
   * If not empty, this text is displayed below the input element (like the `helpText`)
   * when the entered value is marked as valid (`isValid == true`).
   */
  validFeedback: string | undefined;
  /**
   * Only if a form group component is added (`noFormGroup == false`):
   * If not empty, this text is displayed below the input element (like the `helpText`)
   * when the entered value is marked as invalid (`isValid == false`).
   */
  invalidFeedback: string | undefined;
  /**
   * Only if a form group component is added (`noFormGroup == false`):
   * If false (default), the validity feedback texts (`validFeedback` and `invalidFeedback`)
   * are displayed as block element below the content (input element) like the `helpText`.
   * If true, the validity feedback texts are displayed as tooltip (not recommended!).
   */
  validityFeedbackAsTooltip: boolean;

  /** If true, the input element is not wrapped inside a form group component. */
  noFormGroup: boolean;
  /**
   * Only if a form group component is added (`noFormGroup == false`):
   * If true, label and content are displayed in a grid in one line.
   */
  inlineLabel: boolean;

  /** CSS attribute flex-grow of this input element (default value: 1). */
  flexGrow: number | undefined;

}

/**
 * This interface declares the Angular @Input properties
 * of the abstract class `InputBaseWithValue`.
 */
export interface IInputBaseWithValueProperties<T>
  extends IInputBaseProperties {

  /** The entered value. */
  value: T | undefined;

}

/**
 * This interface declares the Angular @Input properties
 * of the abstract class `SelectInputBase`.
 */
export interface ISelectInputBaseProperties<T>
  extends IInputBaseWithValueProperties<T | T[]> {

  /** If true, multiple items can be selected. */
  multiple: boolean;

  /** If true, an additional empty item is added to enable empty selection (`value == undefined`). */
  allowEmpty: boolean;

}

/**
 * This interface declares the Angular @Input properties
 * of the abstract class `InputBaseWithValueAndDataSource`.
 */
export interface IInputBaseWithValueAndDataSourceProperties<TValue, TDataSource = any>
  extends IInputBaseWithValueProperties<TValue> {

  /**
   * An array from which the user can select one or multiple items.
   */
  dataSource: any[];

  /**
   * Evaluate this property name on the data source items
   * to get the values of the select input element items.
   * If undefined, the whole data source item is used as value.
   */
  valuePropertyName: string | undefined;

  /**
   * Evaluate this property name on the data source items
   * to get a string which is displayed on the select input element items.
   * If undefined, the whole data source item is used as display value.
   */
  displayPropertyName: string | undefined;

}
