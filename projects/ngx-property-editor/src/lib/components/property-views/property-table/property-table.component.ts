import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  generatePropertiesConfigurationFromData,
  PropertiesConfiguration,
  PropertyConfiguration,
} from '../property-configuration';
import { TableData } from '../table-configuration';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';

/**
 * This component displays all property values of any object in a table
 * with two columns: one for the property name and one for the property value.
 */
@Component({
  selector: 'pe-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.scss'],
})
export class PropertyTableComponent implements OnInit, OnChanges {

  /** ID attribute of the table element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

  /**
   * Configuration of displayed properties including name, data type, displayed value etc.
   * If undefined, the configuration will be automatically generated from the properties
   * of the `data` object.
   */
  @Input() public configuration: PropertiesConfiguration | undefined = undefined;

  /**
   * Display the properties of this object.
   */
  @Input() public data: any | undefined = undefined;

  protected tableData: TableData = [];

  public ngOnInit(): void {
    this.generateTableData();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('data') || changes.hasOwnProperty('configuration'))
      this.generateTableData();
  }

  private generateTableData(): void {
    const config: PropertiesConfiguration = this.configuration?.length ? this.configuration
      : generatePropertiesConfigurationFromData(this.data);

    if (!this.data || !config?.length) {
      this.tableData = [[{ content: 'Keine Daten', style: 'data' }]];
      return;
    }

    const tableData: TableData = [];
    for (const item of config) {

      if (item.separator) {
        // Add empty row as separator
        tableData.push([]);

      } else {
        const property = item as PropertyConfiguration;

        if (typeof property.hidden === 'function') {
          if (property.hidden(this.data, 'view')) continue;
        } else if (property.hidden) {
          continue;
        }

        // Get displayed value
        if (!property.valueFunction && !property.propertyName) continue;
        let propertyValue: any = property.getDisplayValue(this.data, 'view');
        // Ignore empty values, if hideIfEmpty is true
        if (property.hideIfEmpty && propertyValue == undefined) continue;

        // Get label
        const label: string = property.getLabel(this.data, 'view');

        // Get optional link
        const routerLink: any[] | string | undefined = property.getRouterLink(this.data, 'view');
        const routerLinkIsExternal: boolean | undefined = property.getRouterLinkIsExternal(this.data, 'view');
        const routerLinkTooltip: string | undefined = property.getRouterLinkTooltip(this.data, 'view');

        // Crate table data entry
        tableData.push([
          {
            content: label,
            style: 'header',
          },
          {
            content: propertyValue,
            style: 'data',
            routerLink: routerLink,
            routerLinkIsExternal: routerLinkIsExternal,
            routerLinkTooltip: routerLinkTooltip,
          },
        ]);

      }

    }
    this.tableData = tableData;
  }

}
