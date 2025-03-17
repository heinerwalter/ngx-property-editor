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

  // region Properties for modifying the input element appearance

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

  // endregion>

}
