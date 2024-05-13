import { Component, Input } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { PropertyConfiguration } from '../property-configuration';
import { PropertyEditorMode } from '../property-editor-mode';

@Component({
  selector: 'pe-property-input',
  templateUrl: './property-input.component.html',
  styleUrls: ['./property-input.component.scss'],
})
export class PropertyInputComponent {

  /** ID attribute of the input element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

  /**
   * Configuration of the displayed property including name, data type, displayed value etc.
   */
  @Input() public configuration: PropertyConfiguration | undefined = undefined;

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
   * Display a property of this object.
   */
  @Input() public data: any | undefined = undefined;

  /** If true, the value is displayed as usual (not grey/disabled) but the user cannot change it. */
  @Input() public readonly: boolean = false;

  /**
   * Returns the editor mode based on the `readonly` property.
   */
  protected get mode(): PropertyEditorMode {
    return this.readonly ? 'view' : 'edit';
  }

  /** If true, the input element is not wrapped inside a form group component (no label). */
  @Input() public noFormGroup: boolean = false;

}
