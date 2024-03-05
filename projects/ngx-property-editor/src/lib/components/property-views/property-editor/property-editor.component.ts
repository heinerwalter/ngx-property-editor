import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { generatePropertiesConfigurationFromData, PropertiesConfiguration } from '../property-configuration';

@Component({
  selector: 'pe-property-editor',
  templateUrl: './property-editor.component.html',
  styleUrls: ['./property-editor.component.scss'],
})
export class PropertyEditorComponent implements OnChanges {

  /** ID attribute of the container element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

  /**
   * Configuration of displayed properties including name, data type, displayed value etc.
   * If undefined, the configuration will be automatically generated from the properties
   * of the `data` object.
   */
  @Input() public configuration: PropertiesConfiguration | undefined = undefined;

  protected _configuration: PropertiesConfiguration = [];

  /**
   * Display the properties of this object.
   */
  @Input() public data: any | undefined = undefined;

  /** If true, the properties are displayed as usual (not grey/disabled) but the user cannot change them. */
  @Input() public readonly: boolean = false;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('data') || changes.hasOwnProperty('configuration')) {
      this.generateConfiguration();
    }
  }

  /**
   * Automatically generates a `PropertiesConfiguration` from the properties of the data object,
   * if no `configuration` is given as input property.
   */
  private generateConfiguration(): void {
    this._configuration = this.configuration || generatePropertiesConfigurationFromData(this.data, true);
  }

}
