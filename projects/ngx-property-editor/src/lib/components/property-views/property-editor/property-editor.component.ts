import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { generatePropertiesConfigurationFromData, PropertiesConfiguration } from '../property-configuration';
import { PropertyEditorMode } from '../property-editor-mode';

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

  /**
   * Returns the editor mode based on the `readonly` property.
   */
  protected get mode(): PropertyEditorMode {
    return this.readonly ? 'view' : 'edit';
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('data') ||
      changes.hasOwnProperty('configuration') ||
      changes.hasOwnProperty('readonly')) {
      this.generateConfiguration();
    }
  }

  /**
   * Automatically generates a `PropertiesConfiguration` from the properties of the data object,
   * if no `configuration` is given as input property.
   */
  private generateConfiguration(): void {
    // Get properties configuration
    let configuration: PropertiesConfiguration =
      this.configuration || generatePropertiesConfigurationFromData(this.data, true);

    // Join items from disabled groups
    let modifiedConfiguration: PropertiesConfiguration = [];
    for (let item of configuration) {
      if (item.hasGroup &&
        item.getDisableGroup(this.data, this.mode)) {
        modifiedConfiguration.push(...item.flatGroup);
      } else {
        modifiedConfiguration.push(item);
      }
    }
    configuration = modifiedConfiguration;

    // Remove separators at the beginning and the end,
    // and remove multiple separators after each other.
    modifiedConfiguration = [];
    for (let item of configuration) {
      if (item.separator) {
        // Don't add separators at the beginning
        if (!modifiedConfiguration?.length) continue;
        // Don't add multiple separators after each other
        if (modifiedConfiguration[modifiedConfiguration.length - 1].separator) continue;
      }
      modifiedConfiguration.push(item);
    }
    // Remove separator at the end
    if (modifiedConfiguration?.length &&
      modifiedConfiguration[modifiedConfiguration.length - 1].separator) {
      modifiedConfiguration.splice(modifiedConfiguration.length - 1, 1);
    }
    configuration = modifiedConfiguration;

    this._configuration = configuration;
  }

  protected readonly undefined = undefined;
}
