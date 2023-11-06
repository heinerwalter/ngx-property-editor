import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PropertiesConfiguration, PropertyConfiguration } from '../property-configuration';
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
  @Input() id: string | undefined = undefined;

  /**
   * Configuration of displayed properties including name, data type, displayed value etc.
   */
  @Input() configuration: PropertiesConfiguration = [];

  /**
   * Display the properties of this object.
   */
  @Input() data: any | undefined = undefined;

  tableData: TableData = [];

  ngOnInit() {
    this.generateTableData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('data') || changes.hasOwnProperty('configuration'))
      this.generateTableData();
  }

  private generateTableData() {
    const config: PropertiesConfiguration = this.configuration?.length ? this.configuration
      : this.data ? Object.getOwnPropertyNames(this.data).map(propertyName => {
        return new PropertyConfiguration({ propertyName });
      }) : [];

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
          if (property.hidden(this.data)) continue;
        } else if (property.hidden) {
          continue;
        }

        // Get displayed value
        if (!property.valueFunction && !property.propertyName) continue;
        let propertyValue: any = property.getValue(this.data);
        // Ignore empty values, if hideIfEmpty is true
        if (propertyValue == undefined && property.hideIfEmpty) continue;
        // Evaluate data source, if property type is 'select'
        if (propertyValue != undefined &&
          property.propertyType == 'select' &&
          property.valuePropertyName != property.displayPropertyName) {
          const dataSource = property.getDataSource(this.data);
          if (dataSource) {
            const item = PEGlobalFunctions.getDataSourceItem(dataSource, property.valuePropertyName, propertyValue);
            const itemValue = PEGlobalFunctions.evaluateDisplayPropertyName(property.displayPropertyName, item);
            if (itemValue)
              propertyValue = itemValue;
          }
        }

        // Get label
        const label: string = property.getLabel(this.data);

        // Get optional link
        const routerLink: any[] | string | undefined = property.getRouterLink(this.data);
        const routerLinkTooltip: string | undefined = property.getRouterLinkTooltip(this.data);

        // If propertyValue is a non-empty array, create one table data entry per item
        const propertyValueItems: any[] = [];
        if (Array.isArray(propertyValue)) {
          for (const item of propertyValue) {
            if (item == undefined) continue;
            propertyValueItems.push(item);
          }
          if (!propertyValueItems.length)
            propertyValueItems.push(undefined);
        } else {
          propertyValueItems.push(propertyValue);
        }

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
            routerLinkTooltip: routerLinkTooltip,
          },
        ]);

      }

    }
    this.tableData = tableData;
  }

}
