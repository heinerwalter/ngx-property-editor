import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { PropertyConfiguration } from '../../property-views/property-configuration';
import { TableCellTemplateContextType, TableData, TableHeader, TableRow } from '../table-configuration';
import { PropertyTableColumn, SpecialPropertyTableColumnType } from '../property-table-column';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faColumns, faPen, faRotateBack, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PropertyTableColumnController } from '../controller/property-table-column-controller';
import { PropertyFilter, PropertyTableFilter } from '../property-table-filter';
import { PropertyTableFilterController } from '../controller/property-table-filter-controller';
import { PropertyConfigurationController } from '../../property-views/controller/property-configuration-controller';
import { PropertyTableSelectionMode } from '../property-table-selection-mode';
import { PropertyTableStateSaveController } from '../controller/property-table-state-save-controller';

/**
 * A component displaying configured properties of multiple `data` objects as table.
 * @see PropertyConfiguration
 */
@Component({
  selector: 'pe-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PropertyTableComponent implements OnInit, OnChanges {

  /** ID attribute of the container element. */
  @Input() public id: string | undefined = undefined;

  /**
   * Configuration of displayed properties of each table entry including name,
   * data type, displayed value etc.
   */
  @Input() public configuration: PropertyConfiguration[] | undefined = undefined;

  /**
   * Display these objects in the table.
   */
  @Input() public data: any[] | undefined = undefined;

  /**
   * Reference to the primary key property configuration which is an
   * element of `configuration` with `isPrimaryKey == true`.
   * If `undefined`, the data array index is used as primary key.
   */
  protected primaryKey: PropertyConfiguration | undefined = undefined;

  /**
   * All columns generated from the property `configuration`
   * including currently invisible columns.
   */
  protected columns: PropertyTableColumn[] = [];

  /**
   * All currently visible columns which is a subset of `columns`.
   */
  protected visibleColumns: PropertyTableColumn[] = [];

  /**
   * Table header definition used by the <pe-table> component.
   * Generated by `generateTableHeader()`.
   */
  protected tableHeader: TableHeader = [];
  /**
   * Table data definition used by the <pe-table> component.
   * Generated by `generateTableBody()`.
   */
  protected tableData: TableData = [];

  /**
   * If true the table data can be edited by the user inside the table.
   */
  protected isEditing: boolean = false;

  // region Filter

  /**
   * If true, a filter row is displayed below the header.
   */
  @Input() public showFilterRow: boolean = true;

  /**
   * Only used if `showFilterRow` is true.
   * Filter object containing the filter expressions of all table columns.
   */
  protected filter: PropertyTableFilter = {};

  /**
   * Global filter value which is applied to any column.
   */
  protected globalFilter: string = '';

  // endregion

  // region Special Columns

  /**
   * If true, a goto detail link (arrow icon ->) is displayed in the special buttons' column
   * for navigating to the detail page of a data object (row).
   * When the goto detail link is clicked, the `onDetailLinkClick` event is emitted.
   * @see onDetailLinkClick
   */
  @Input() public showDetailLink: boolean = false;

  /**
   * This event is emitted when the goto detail link was clicked by the user.
   * The data object of the row on which the goto detail link was clicked is passed as event argument.
   * @see showDetailLink
   */
  @Output() public readonly onDetailLinkClick: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Returns true, if the special buttons' column should be visible.
   */
  private showSpecialColumnButtons(): boolean {
    return this.showDetailLink || // Show goto detail link
      this.editable; // Show delete button
  }

  /** Special column definition for the row selection column. */
  private specialColumnSelection: PropertyTableColumn =
    PropertyTableColumn.createSpecialColumn('selection', -999999999);
  /** Special column definition for the buttons' column. */
  private specialColumnButtons: PropertyTableColumn =
    PropertyTableColumn.createSpecialColumn('buttons', 999999999);

  /** Reference to the special column cell template for the row selection column. */
  @ViewChild('specialColumnCellTemplateSelection', { static: true })
  protected specialColumnCellTemplateSelection?: TemplateRef<TableCellTemplateContextType>;
  /** Reference to the special column cell template for the buttons' column. */
  @ViewChild('specialColumnCellTemplateButtons', { static: true })
  protected specialColumnCellTemplateButtons?: TemplateRef<TableCellTemplateContextType>;

  /**
   * Returns the special column cell template for the given special column type.
   * @param specialColumnType A special property table column type.
   */
  private getSpecialColumnCellTemplate(
    specialColumnType: SpecialPropertyTableColumnType,
  ): TemplateRef<TableCellTemplateContextType> | undefined {
    switch (specialColumnType) {
      case 'selection':
        return this.specialColumnCellTemplateSelection;
      case 'buttons':
        return this.specialColumnCellTemplateButtons;
      default:
        return undefined;
    }
  }

  // endregion

  // region Selection

  /**
   * Row selection mode.
   */
  @Input() public selectionMode: PropertyTableSelectionMode = 'none';

  // endregion

  // region Editing

  /** If true, the properties displayed in the table are editable by the user. */
  @Input() public editable: boolean = false;

  // endregion

  // Icons used in the template
  protected iconGoto: IconDefinition = faArrowRight;
  protected iconEdit: IconDefinition = faPen;
  protected iconDelete: IconDefinition = faTrash;
  protected iconSave: IconDefinition = faSave;
  protected iconRevert: IconDefinition = faRotateBack;
  protected iconColumnChooser: IconDefinition = faColumns;

  /** This property is set to true by `ngOnInit()`. */
  private isInitialized: boolean = false;

  public constructor() {
  }

  public ngOnInit(): void {
    this.isInitialized = true;

    this.generateColumns();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Don't generate table data for each property change before initialization is complete.
    // See ngOnInit().
    if (!this.isInitialized) return;

    let hasGenerated = false;

    // Generate columns
    if (changes.hasOwnProperty('configuration')) {
      this.generateColumns();
      hasGenerated = true;
    }

    // Update visibility of special columns
    if (!hasGenerated && changes.hasOwnProperty('selectionMode')) {
      const isVisible: boolean = this.selectionMode != 'none';
      if (this.specialColumnSelection.isVisible != isVisible) {
        this.specialColumnSelection.isVisible = isVisible;
        this.updateVisibleColumns();
        hasGenerated = true;
      }
    }
    if (!hasGenerated && (
      changes.hasOwnProperty('showDetailLink') ||
      changes.hasOwnProperty('editable'))) {
      const isVisible: boolean = this.showSpecialColumnButtons();
      if (this.specialColumnButtons.isVisible != isVisible) {
        this.specialColumnButtons.isVisible = isVisible;
        this.updateVisibleColumns();
        hasGenerated = true;
      }
    }

    // Generate table body only
    if (!hasGenerated && changes.hasOwnProperty('data')) {
      this.generateTableBody(this.visibleColumns);
    }

  }

  /**
   * Saves the current column state to the `localStorage`.
   */
  protected saveState(): void {
    if (!this.id) return;
    PropertyTableStateSaveController.saveColumnState(this.id, this.columns);
  }

  /**
   * Restores the state of the given `columns` from the `localStorage`.
   */
  private restoreState(columns: PropertyTableColumn[]): void {
    if (!this.id) return;
    PropertyTableStateSaveController.restoreColumnState(this.id, columns);
  }

  /**
   * Generates the table `columns` from the given property `configuration`.
   */
  private generateColumns(): void {
    if (!this.configuration?.length) {
      this.columns = [];
      this.primaryKey = undefined;
    } else {

      // Generate columns
      const columns: PropertyTableColumn[] = PropertyTableColumnController.generateColumns(this.configuration);
     
      // Add special columns
      columns.unshift(this.specialColumnSelection);
      columns.push(this.specialColumnButtons);

      // Restore state
      this.restoreState(columns);

      this.columns = columns;

      // Search for a primary key
      this.primaryKey = PropertyConfigurationController.getPrimaryKeyProperty(this.configuration);

    }

    this.updateVisibleColumns();
  }

  /**
   * Updates the visible columns array
   */
  protected updateVisibleColumns(): void {
    // Generate visible columns
    this.visibleColumns = PropertyTableColumnController.generateVisibleColumns(this.columns);

    // Generate table header and body cells.
    this.generateTableHeader(this.visibleColumns);
    this.generateTableBody(this.visibleColumns);
  }

  /**
   * Generates the displayed table header data from the given `columns`.
   * @param columns The visible columns which should be displayed in the table.
   *                The `isVisible` property of the columns is ignored.
   * @see generateColumns
   * @see updateVisibleColumns
   */
  private generateTableHeader(columns: PropertyTableColumn[]): void {
    if (!columns?.length) {
      this.tableHeader = [[]];
    }

    // Compute the number of header rows based on the maximum column group depth.
    const headerRowCount: number = PropertyTableColumnController.computeMaxColumnGroupDepth(columns);

    // Initialize new table data
    const tableHeader: TableHeader = [];
    // Initialize table header rows
    for (let i = 0; i < headerRowCount; i++) {
      tableHeader.push([]);
    }

    /**
     * Generates table header cells for the given column and all of its child columns.
     * @param column The column for which the header cell should be generated.
     * @param tableHeaderRowIndex The index of the table header row into which the column should be added.
     */
    function handleColumn(
      column: PropertyTableColumn,
      tableHeaderRowIndex: number = 0,
    ): void {
      // Generate a table header cell:
      tableHeader[tableHeaderRowIndex].push({
        elementType: 'header',
        content: column.property.getLabel(undefined, 'table'),
        class: 'property-table-header-cell',
        // If the column is a group, it should span all child columns.
        colspan: column.totalChildrenCount || undefined,
        // If the column is not a group, it should span all following header rows
        rowspan: !column.isGroup ? tableHeader.length - tableHeaderRowIndex : undefined,
      });

      // Add child columns, if the column is a group
      if (column.isGroup) {
        for (const child of column.children) {
          handleColumn(child, tableHeaderRowIndex + 1);
        }
      }
    }

    // Generate header:
    for (const column of columns) {
      handleColumn(column);
    }

    // Generate filter row:
    this.generateFilterRow(columns, tableHeader);

    // Assign new table data
    this.tableHeader = tableHeader;
  }

  /**
   * Generates the filter row (appended to the previously generated table
   * header data) from the given `columns`, and initializes the `filter` object
   * with empty `PropertyFilter` objects for each visible columns.
   * Already existing `PropertyFilter` objects of columns which remain visible
   * remain unchanged in the `filter` object.
   * @param columns The visible columns which should be displayed in the table.
   *                The `isVisible` property of the columns is ignored.
   * @param tableHeader The table header data to which the filter row should be appended.
   * @see generateTableHeader
   */
  private generateFilterRow(
    columns: PropertyTableColumn[],
    tableHeader: TableHeader = [],
  ): void {
    if (!this.showFilterRow || !columns?.length) {
      this.filter = {};
      return;
    }
    if (!this.filter) this.filter = {};

    // Get keys of all already existing filters.
    // All filters with keys which remain in this array at the end of this method,
    // are removed from the `filter` object (related column is not visible anymore).
    const oldFilterKeys: string[] = Object.getOwnPropertyNames(this.filter || {});

    // Initialize filter row.
    const filterRow: TableRow = [];

    /**
     * (#1) Generates filter row cells,
     * (#2) adds new filters which do not exist in the `oldFilterKeys` array,
     * (#3) and removes filters which remain visible from the `oldFilterKeys` array.
     * @param column The column for which the filter row cell should be generated.
     */
    const handleColumn = (
      column: PropertyTableColumn,
    ): void => {
      if (column.isGroup) {
        for (const childColumn of column.children) {
          handleColumn(childColumn);
        }
        return;
      }

      // Hide filter?
      if (column.specialType || column.hideFilter) {
        // Generate empty filter row cells.
        filterRow.push({
          elementType: 'header',
          content: '',
          class: 'property-table-filter-cell property-table-filter-cell-hidden',
        });
        return;
      }

      // Generate filter key.
      const key: string = PropertyTableFilterController.generateColumnFilterKey(column.property, filterRow.length);

      // #1: Generate filter row cells.
      filterRow.push({
        elementType: 'header',
        content: this.filter,
        propertyConfiguration: new PropertyConfiguration({
          propertyName: key + '.filter',
          label: 'Filter ' + column.property.getLabel(undefined, 'table'),
          propertyType: 'string',
          editable: true,
        }),
        showPropertyInput: true,
        onPropertyInputValueChanged: () => this.onFilterChanged(),
        class: 'property-table-filter-cell',
      });

      const index: number = oldFilterKeys.indexOf(key);
      if (index < 0) {
        // #2: Add new filters which do not exist in the `oldFilterKeys` array,
        this.filter[key] = new PropertyFilter(column.property);

      } else {
        // #3: Remove filters which remain visible from the `oldFilterKeys` array.
        oldFilterKeys.splice(index, 1);
      }
    };

    // Iterate over all columns,
    // (#1) generate filter row cells
    // (#2) add new filters which do not exist in the `oldFilterKeys` array,
    // (#3) and remove filters which remain visible from the `oldFilterKeys` array.
    for (const column of columns) {
      handleColumn(column);
    }

    // Remove filters with keys which remain in the `oldFilterKeys` array.
    for (const key of oldFilterKeys) {
      delete this.filter[key];
    }

    tableHeader.push(filterRow);
  }

  /**
   * Generates the displayed table content data from the given `columns` and `this.data`.
   * @param columns The visible columns which should be displayed in the table.
   *                The `isVisible` property of the columns is ignored.
   * @see generateColumns
   * @see updateVisibleColumns
   */
  private generateTableBody(columns: PropertyTableColumn[]): void {
    if (!columns?.length) {
      this.tableData = [];
    }

    // Initialize new table data
    const tableData: TableData = [];

    /**
     * Generates table body cells for the given column and all of its child columns.
     * @param column The column for which the header cell should be generated.
     * @param tableRow The table row into which the cells should be added.
     * @param dataEntry An item of the `data` array which is displayed in the `tableRow`.
     */
    const handleColumn = (
      column: PropertyTableColumn,
      tableRow: TableRow,
      dataEntry: any,
    ): void => {
      if (column.isGroup) {
        // Generate cells for child columns, if the column is a group
        for (const child of column.children) {
          handleColumn(child, tableRow, dataEntry);
        }

      } else {
        if (column.specialType) {
          // Generate a special table body cell
          tableRow.push({
            elementType: 'data',
            content: dataEntry,
            template: this.getSpecialColumnCellTemplate(column.specialType),
            showPropertyInput: true,
            class: 'property-table-data-cell property-table-special-data-cell',
          });

        } else {
          // Generate a table body cell
          tableRow.push({
            elementType: 'data',
            content: dataEntry,
            propertyConfiguration: column.property,
            showPropertyInput: undefined,
            class: 'property-table-data-cell',
          });
        }
      }
    };

    // Generate body
    for (const dataEntry of this.data || []) {
      // Evaluate filter
      if (!this.evaluateFilter(columns, dataEntry)) continue;

      // Initialize new table row
      const tableRow: TableRow = [];
      // Generate cells
      for (const column of columns) {
        handleColumn(column, tableRow, dataEntry);
      }
      // Add new table row
      tableData.push(tableRow);
    }

    // Assign new table data
    this.tableData = tableData;
  }

  // region Filter

  /**
   * This method is called, when the user changed any filter value.
   */
  protected onFilterChanged(): void {
    // Re generate table data
    this.generateTableBody(this.visibleColumns);
  }

  /**
   * Evaluates the filter on the given data object (row).
   * @param columns The visible columns which should be displayed in the table.
   * @param dataEntry The data object.
   * @returns True, if the given data object should be displayed (filter is empty or matching).
   */
  private evaluateFilter(
    columns: PropertyTableColumn[],
    dataEntry: any,
  ): boolean {
    // Evaluate table column filters
    if (!PropertyTableFilterController.evaluateFilters(dataEntry, this.filter))
      return false;

    // Evaluate global filter
    if (!PropertyTableFilterController.evaluateGlobalFilter(columns, dataEntry, this.globalFilter))
      return false;

    return true;
  }

  // endregion

  // region Editing

  protected startEditing(): void {
    this.isEditing = true;
  }

  protected deleteRow(dataEntry: any): void {
    // TODO: Delete row

    this.isEditing = true;
  }

  protected saveChanges(): void {
    // TODO: Save changes

    this.isEditing = false;
  }

  protected revertChanges(): void {
    // TODO: Revert changes

    this.isEditing = false;
  }

  // endregion

}
