import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { PropertyConfiguration } from '../property-configuration';
import { PropertyEditorMode } from '../property-editor-mode';

@Component({
  selector: 'pe-property-input-with-group',
  templateUrl: './property-input-with-group.component.html',
  styleUrls: ['./property-input-with-group.component.scss'],
})
export class PropertyInputWithGroupComponent {

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
   * True, if a group of properties is displayed.
   */
  public get hasGroup(): boolean {
    return !!this.configuration?.hasGroup;
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

  // endregion

}
