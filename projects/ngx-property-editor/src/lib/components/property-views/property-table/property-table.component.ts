import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { PropertyConfiguration, PropertiesConfiguration } from '../property-configuration';
import { TableData, TableHeader, TableRow } from '../table-configuration';
import { PropertyTableColumn } from '../property-table-column';

/**
 * A component displaying configured properties of multiple `data` objects as table.
 * @see PropertiesConfiguration
 */
@Component({
  selector: 'pe-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PropertyTableComponent implements OnInit, OnChanges {

  /** ID attribute of the container element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

  /**
   * Configuration of displayed properties of each table entry including name,
   * data type, displayed value etc.
   */
  @Input() public configuration: PropertiesConfiguration | undefined = undefined;

  protected _configuration: PropertiesConfiguration = [];
  /** Maximum number of header rows based on the group depth of `_configuration`. */
  protected _headerRowCount: number = 1;
  /**
   * All currently visible columns in the currently visible order including it's
   * property configurations and parent columns.
   * Group columns are not included in this array but are reachable via each columns
   * parent column property.
   */
  protected _columns: PropertyTableColumn[] = [];

  /** Table header definition used by the <pe-table> component. */
  protected _tableHeader: TableHeader = [];
  /** Table data definition used by the <pe-table> component. */
  protected _tableData: TableData = [];

  /**
   * Display these objects in the table.
   */
  @Input() public data: any[] | undefined = undefined;

  /** If true, a filter row is displayed below the header. */
  @Input() public showFilterRow: boolean = true;
  /**
   * Only used if `showFilterRow` is true.
   * Filter object into which the filter values are written.
   */
  protected filter: any = {};

  /** If true, the properties displayed in the table are editable by the user. */
  @Input() public editable: boolean = false;

  /** This property is set to true by `ngOnInit()`. */
  private isInitialized: boolean = false;

  public constructor() {
  }

  public ngOnInit(): void {
    this.isInitialized = true;

    this.prepareConfiguration();
    this.generateTableHeader();
    this.generateTableBody();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Don't generate table data for each property change before initialization is complete.
    // See ngOnInit().
    if (!this.isInitialized) return;

    if (changes.hasOwnProperty('configuration')) {
      this.prepareConfiguration();
      this.generateTableHeader();
    }
    if (changes.hasOwnProperty('data')) {
      this.generateTableBody();
    }
  }

  /**
   * Prepares the given `configuration`.
   */
  private prepareConfiguration(): void {
    function helper(configuration: PropertiesConfiguration | undefined, currentGroupDepth: number): {
      configuration: PropertiesConfiguration,
      maxGroupDepth: number,
    } {
      configuration = configuration || [];
      let maxGroupDepth: number = currentGroupDepth;

      // Join items from disabled groups
      let modifiedConfiguration: PropertiesConfiguration = [];
      for (let item of configuration) {
        if (item.hasGroup) {
          if (item.getDisableGroup(undefined, 'table')) {
            modifiedConfiguration.push(...item.flatGroup);
          } else {
            const groupResult = helper(item.flatGroup, currentGroupDepth + 1);
            item.group = [groupResult.configuration];
            modifiedConfiguration.push(item);
            if (groupResult.maxGroupDepth > maxGroupDepth)
              maxGroupDepth = groupResult.maxGroupDepth;
          }
        } else {
          modifiedConfiguration.push(item);
        }
      }
      configuration = modifiedConfiguration;

      // Remove all separators and hidden properties.
      modifiedConfiguration = [];
      for (let item of configuration) {
        // Remove separator
        if (item.separator) continue;
        // Remove hidden row
        if (item.isHidden(undefined, 'table', true)) continue;
        modifiedConfiguration.push(item);
      }
      configuration = modifiedConfiguration;

      return {
        configuration: configuration,
        maxGroupDepth: maxGroupDepth,
      };
    }

    const result = helper(this.configuration || [], 1);
    this._configuration = result.configuration;
    this._headerRowCount = result.maxGroupDepth;
  }

  /**
   * Generates the displayed table header data from the given `configuration`.
   * This method must be called after `prepareConfiguration()`!
   */
  private generateTableHeader(): void {
    if (!this._configuration?.length) {
      this._tableHeader = [[]];
    }

    // Initialize new table data
    const tableHeader: TableHeader = [];
    // Initialize table header rows
    for (let i = 0; i < this._headerRowCount; i++) {
      tableHeader.push([]);
    }

    const columns: PropertyTableColumn[] = []

    /**
     * 
     * @param tableHeaderRowIndex The index of the table header row into which the property column should be added.
     * @param property The Property definition from which a table header cell should be generated.
     * @returns The total number of added columns (1 without property groups).
     */
    function handleHeaderProperty(property: PropertyConfiguration,
                                  tableHeaderRowIndex: number = 0,
                                  parentColumn: PropertyTableColumn | undefined = undefined): {
      column: PropertyTableColumn,
      totalAddedColumns: number,
    } {
      const column: PropertyTableColumn = {
        property,
        parent: parentColumn,
        isGroup: false,
        children: [],
      }

      if (property.hasGroup) {
        column.isGroup = true;

        // Generate group columns
        let columnCount: number = 0;
        const groupProperties: PropertiesConfiguration = property.group![0];
        if (tableHeader.length <= tableHeaderRowIndex + 1) tableHeader.push([]);
        for (const property of groupProperties) {
          const result = handleHeaderProperty(property, tableHeaderRowIndex + 1);
          column.children.push(result.column);
          columnCount += result.totalAddedColumns;
        }

        if (columnCount > 0) {
          tableHeader[tableHeaderRowIndex].push({
            elementType: 'header',
            content: property.getLabel(undefined, 'table'),
            class: 'property-table-header-cell',
            colspan: columnCount,
          });
        }
        return {
          column: column,
          totalAddedColumns: columnCount,
        };

      } else {

        // Generate single column
        columns.push(column);
        tableHeader[tableHeaderRowIndex].push({
          elementType: 'header',
          content: property.getLabel(undefined, 'table'),
          class: 'property-table-header-cell',
          rowspan: tableHeader.length - tableHeaderRowIndex,
        });
        return {
          column: column,
          totalAddedColumns: 1,
        };

      }
    }

    // Generate header:
    for (const property of this._configuration) {
      handleHeaderProperty(property);
    }

    // Generate filter row:
    if (this.showFilterRow) {
      tableHeader.push([]);
      for (let i = 0; i < columns.length; i++) {
        const column: PropertyTableColumn = columns[i];

        const label = column.property.getLabel(undefined, 'table');
        tableHeader[tableHeader.length - 1].push({
          elementType: 'header',
          content: this.filter,
          propertyConfiguration: new PropertyConfiguration({
            propertyName: this.generateFilterPropertyName(i, column.property),
            label: label ? 'Filter: ' + label : 'Filter',
            propertyType: 'string',
            editable: true,
          }),
          showPropertyInput: true,
          onPropertyInputValueChanged: () => this.onFilterChanged(),
          class: 'property-table-filter-cell',
        });
      }
    }

    // Assign new table data
    this._tableHeader = tableHeader;
    this._columns = columns;
  }

  /**
   * Generates the displayed table content data from the given `configuration` and `data`.
   * This method must be called after `generateTableHeader()`!
   */
  private generateTableBody(): void {
    if (!this._configuration?.length) {
      this._tableData = [];
    }

    // Initialize new table data
    const tableData: TableData = [];

    // Generate body:
    for (const dataRow of this.data || []) {
      // Evaluate filter
      if (!this.evaluateFilter(dataRow)) continue;

      // Initialize new table row
      const tableRow: TableRow = [];
      // Generate cells:
      for (const column of this._columns) {
        tableRow.push({
          elementType: 'data',
          content: dataRow, // column.property.getDisplayValue(dataRow, 'table', true),
          propertyConfiguration: column.property,
          showPropertyInput: undefined,
          class: 'property-table-data-cell',
        });
      }
      // Add new table row
      tableData.push(tableRow);
    }

    // Assign new table data
    this._tableData = tableData;
  }

  // region Filter

  /**
   * Generates a filter object property name by which the filter value
   * for a visible table column is stored in the `filter` object.
   * @param columnIndex Index of the visible column.
   * @param propertyConfiguration Property configuration on which the column is based.
   */
  private generateFilterPropertyName(columnIndex: number,
                                     propertyConfiguration: PropertyConfiguration): string {
    if (propertyConfiguration.propertyName) {
      return propertyConfiguration.propertyName.replaceAll('.', '_');
    } else {
      return `#column-index#${columnIndex}`;
    }
  }

  /**
   * Evaluates the `filter` object on the given data row
   * @param row An element (row) of `data`.
   * @returns True, if the given row should be displayed (filter is matching).
   */
  private evaluateFilter(row: any): boolean {
    if (!this.filter || typeof this.filter !== 'object') return true;
    if (typeof row !== 'object') return false;

    for (let i = 0; i < this._columns.length; i++) {
      const column = this._columns[i];

      // Get filter value
      let filterPropertyName: string = this.generateFilterPropertyName(i, column.property);
      const filterValue: string = this.filter[filterPropertyName]?.toString().toLowerCase();
      if (!filterValue) continue;

      // Evaluate filter on the property value
      if (!column.property.evaluateFilter(row, 'table', filterValue))
        return false;
    }

    return true;
  }

  /**
   * This method is called, when the user changed any filter value.
   */
  private onFilterChanged(): void {
    // Re generate table data
    this.generateTableBody();
  }

  // endregion

}
