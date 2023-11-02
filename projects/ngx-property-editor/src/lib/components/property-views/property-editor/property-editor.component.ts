import { Component, Input } from '@angular/core';
import { PropertiesConfiguration } from '../property-configuration';

@Component({
  selector: 'pe-property-editor',
  templateUrl: './property-editor.component.html',
  styleUrls: ['./property-editor.component.scss'],
})
export class PropertyEditorComponent {

  /** ID attribute of the container element. */
  @Input() id: string | undefined = undefined;

  /**
   * Configuration of displayed properties including name, data type, displayed value etc.
   */
  @Input() configuration: PropertiesConfiguration = [];

  /**
   * Display the properties of this object.
   */
  @Input() data: any | undefined = undefined;

  /** If true, the properties are displayed as usual (not grey/disabled) but the user cannot change them. */
  @Input() readonly: boolean = false;

}
