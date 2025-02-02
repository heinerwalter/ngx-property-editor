import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { PropertiesConfiguration } from '../property-configuration';
import { PropertyEditorMode } from '../property-editor-mode';

/**
 * A component displaying configured properties of multiple `data` objects as table.
 * @see PropertiesConfiguration
 */
@Component({
  selector: 'pe-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.scss'],
})
export class PropertyTableComponent implements OnChanges {

  /** ID attribute of the container element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

  /**
   * Configuration of displayed properties of each table entry including name,
   * data type, displayed value etc.
   */
  @Input() public configuration: PropertiesConfiguration | undefined = undefined;

  protected _configuration: PropertiesConfiguration = [];

  /**
   * Display these objects in the table.
   */
  @Input() public data: any[] | undefined = undefined;

  /** Property editor mode (fixed to `'table'`). */
  public readonly mode: PropertyEditorMode = 'table';

  /** If true, the properties displayed in the table are editable by the user. */
  @Input() public editable: boolean = false;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('configuration')) {
      this.generateConfiguration();
    }
  }

  /**
   * Prepare the given `PropertiesConfiguration` for being used in the template.
   */
  private generateConfiguration(): void {
    // Get properties configuration
    let configuration: PropertiesConfiguration = this.configuration || [];

    // Join items from disabled groups
    let modifiedConfiguration: PropertiesConfiguration = [];
    for (let item of configuration) {
      if (item.hasGroup &&
        item.getDisableGroup(undefined, 'table')) {
        modifiedConfiguration.push(...item.flatGroup);
      } else {
        modifiedConfiguration.push(item);
      }
    }
    configuration = modifiedConfiguration;

    // Remove all separators.
    modifiedConfiguration = [];
    for (let item of configuration) {
      if (item.separator) continue;
      modifiedConfiguration.push(item);
    }
    configuration = modifiedConfiguration;

    this._configuration = configuration;
  }

}
