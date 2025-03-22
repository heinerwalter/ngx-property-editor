import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PropertyConfiguration } from '../property-configuration';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { PropertyEditorMode } from '../property-editor-mode';

@Component({
  selector: 'pe-property-input-with-array',
  templateUrl: './property-input-with-array.component.html',
  styleUrls: ['./property-input-with-array.component.scss'],
})
export class PropertyInputWithArrayComponent {

  /** ID attribute of the input element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

  /**
   * Configuration of the displayed property including name, data type, displayed value etc.
   */
  @Input() public configuration: PropertyConfiguration | undefined = undefined;

  /**
   * Display a property of this object.
   */
  @Input() public data: any | undefined = undefined;

  /**
   * This event is emitted when the user changed the value of the input element.
   * The changed property value is passed as event argument.
   */
  @Output() public readonly valueChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * True, if an array of property inputs is displayed.
   */
  public get hasArray(): boolean {
    return !!this.configuration && this.configuration.isArray &&
      (!this.configuration.hasGroup || this.configuration.propertyType != 'select');
  }

  /**
   * Only used if `configuration.isArray` is true:
   * This function gets called, before a new item is added to the array property.
   * The result of this function is added to the array as new item. If this function
   * is not defined, `undefined` is added to the array as new item.
   */
  protected readonly newArrayItemFunction = (): any => {
    if (typeof this.configuration?.newArrayItemFunction !== 'function') return undefined;

    return this.configuration.newArrayItemFunction(this.data);
  };

  /**
   * The property editor mode.
   * The input element is editable, if the mode is not "view".
   */
  @Input() public mode: PropertyEditorMode = 'edit';

  /** If true, the value is displayed as usual (not grey/disabled) but the user cannot change it (readonly). */
  public get readonly(): boolean {
    return this.mode == 'view';
  }

  /** If true, the input element is not wrapped inside a form group component (no label). */
  @Input() public noFormGroup: boolean = false;

}
