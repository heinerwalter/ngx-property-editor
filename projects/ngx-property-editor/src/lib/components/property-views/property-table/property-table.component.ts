import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { PropertyConfiguration, PropertiesConfiguration } from '../property-configuration';
import { PropertyEditorMode } from '../property-editor-mode';
import { TableData, TableHeader, TableRow, TableHeaderRow } from '../table-configuration';


export type PropertyTableColumn = {
  property: PropertyConfiguration,
  parent: PropertyTableColumn | undefined,
  isGroup: boolean,
  children: PropertyTableColumn[],
};


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

  /** Property editor mode (fixed to `'table'`). */
  public readonly mode: PropertyEditorMode = 'table';

  /** If true, the properties displayed in the table are editable by the user. */
  @Input() public editable: boolean = false;

  /** This property is set to true by `ngOnInit()`. */
  private isInitialized: boolean = false;

  public constructor() {
  }

  public ngOnInit(): void {
    this.isInitialized = true;

    this.prepareConfiguration();
    this.generateTableData();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Don't generate table data for each property change before initialization is complete.
    // See ngOnInit().
    if (!this.isInitialized) return;

    if (changes.hasOwnProperty('configuration')) {
      this.prepareConfiguration();
    }
    if (changes.hasOwnProperty('configuration') ||
      changes.hasOwnProperty('data')) {
      this.generateTableData();
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
   * Generates the displayed table data from the given `configuration` and `data`.
   */
  private generateTableData(): void {
    if (!this._configuration?.length) {
      this._tableHeader = [[]];
      this._tableData = [];
    }

    // Initialize new table data
    const tableHeader: TableHeader = [];
    const tableData: TableData = [];
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

    // Generate body:
    for (const dataRow of this.data || []) {
      // Initialize new table row
      const tableRow: TableRow = [];
      // Generat cells:
      for (const column of columns) {
        tableRow.push({
          content: column.property.getDisplayValue(dataRow, 'table', true),
          class: 'property-table-data-cell',
        });
      }
      // Add new table row
      tableData.push(tableRow);
    }

    // Assign new table data
    this._tableHeader = tableHeader;
    this._tableData = tableData;
    this._columns = columns;
  }

}
