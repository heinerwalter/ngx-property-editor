import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PropertiesConfiguration, generatePropertiesConfigurationFromData } from '../property-configuration';

@Component({
  selector: 'pe-property-editor',
  templateUrl: './property-editor.component.html',
  styleUrls: ['./property-editor.component.scss'],
})
export class PropertyEditorComponent implements OnChanges {

  /** ID attribute of the container element. */
  @Input() public id: string | undefined = undefined;

  /**
   * Configuration of displayed properties including name, data type, displayed value etc.
   */
  @Input() public configuration: PropertiesConfiguration | undefined = undefined;

  public _configuration: PropertiesConfiguration = [];

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

  private generateConfiguration(): void {
    this._configuration = this.configuration || generatePropertiesConfigurationFromData(this.data);
  }

}
