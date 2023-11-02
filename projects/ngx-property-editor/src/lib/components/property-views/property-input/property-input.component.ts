import { Component, Input } from '@angular/core';
import { PEGlobalFunctions } from '../../../global-functions';
import { PropertyConfiguration } from '../property-configuration';

@Component({
  selector: 'app-property-input',
  templateUrl: './property-input.component.html',
  styleUrls: ['./property-input.component.scss'],
})
export class PropertyInputComponent {

  /** ID attribute of the input element. */
  id: string = PEGlobalFunctions.generateRandomId();

  /**
   * Configuration of the displayed property including name, data type, displayed value etc.
   */
  @Input() configuration: PropertyConfiguration | undefined = undefined;

  /**
   * Display a property of this object.
   */
  @Input() data: any | undefined = undefined;

  /** If true, the value is displayed as usual (not grey/disabled) but the user cannot change it. */
  @Input() readonly: boolean = false;

}
