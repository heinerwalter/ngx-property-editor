import { LocalStorageController } from '../../../controller/local-storage-controller';
import { PropertyTableColumn } from "../property-table-column";

/**
 * This module provides functions for saving and restoring
 * the state of a `PropertyTableComponent`.
 */
export namespace PropertyTableStateSaveController {

  export type SingleColumnState = {
    /** Property name, or index in the columns array, if no property name exists. */
    propertyName: string;
    isVisible: boolean;
    order: number | undefined;
    width: number | undefined;
  }

  export type ColumnState = { [propertyName: string]: SingleColumnState };

  function getPropertyName(column: PropertyTableColumn, index: string | number): string {
    return column.property?.propertyName || index.toString();
  }
 
  /**
   * Generates a JSON object describing the current state of the given single
   * property table column. The state contains visibility, order and width
   * of the column . The result of this function can be saved and resored later.
   * @param column The state object of this table column will be generated.
   * @returns Column state as JSON object.
   */
  function singleColumnStateToJson(column: PropertyTableColumn, index: string): SingleColumnState | undefined {
    if (!column || column?.specialType) return undefined;

    return {
      propertyName: getPropertyName(column, index),
      isVisible: column.isVisible,
      order: column.order || undefined,
      width: undefined,
    };
  }

  function restoreSingleColumnFromJson(column: PropertyTableColumn, state: SingleColumnState | undefined): boolean {
    if (!state || typeof state !== 'object') return false;
    if (!column || column?.specialType) return false;

    let hasChanged: boolean = false;

    if (state.isVisible != undefined) {
      column.isVisible = state.isVisible;
      hasChanged = true;
    }
    if (state.order != undefined) {
      column.order = state.order;
      hasChanged = true;
    }
    if (state.width != undefined) {
      //column.width = state.width;
      hasChanged = true;
    }

    return hasChanged;
  }

  /**
   * Generates a JSON object describing the current state of the given
   * property table columns. The state contains visibility, order, width, etc.
   * of the columns. The result of this function can be saved and resored later.
   * @param columns The state objects of these table columns will be generated.
   * @returns Column state as JSON object.
   */
  export function columnStateToJson(columns: PropertyTableColumn[]): ColumnState {
    const state: ColumnState = {}; 
    if (!columns?.length) return state;
 
    function helper(columns: PropertyTableColumn[], index: string = ''): SingleColumnState[] {
      const array: SingleColumnState[] = [];
      if (!columns?.length) return array;
      
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        const indexI = (index ? index + '-' : '') + i;
  
        const columnsState = singleColumnStateToJson(column, indexI);
        if (columnsState)
          array.push(columnsState);

        if (column.isGroup) {
          array.push(...helper(column.children, indexI));
        }
      }
      
      return array;
    }
 
    const stateArray = helper(columns);
    for (let columnState of stateArray) {
      state[columnState.propertyName] = columnState;
    }
 
    return state;
  }
 
  /**
   * Saves the current state of the given property table columns
   * to the `localStorage`. The state contains visibility,
   * order, width, etc. of the columns.
   * @param id ID of the table element.
   * @param columns The state of these table columns will be saved.
   * @returns True, if the column state has been saved successfully.
   */
  export function saveColumnState(id: string, columns: PropertyTableColumn[]): boolean {
    const state = columnStateToJson(columns);
    return LocalStorageController.setJson(LocalStorageController.KeyPrefix.Table_ColumnState, id, state);
  }

  /**
   * Restores the state of the given property table columns from
   * the `localStorage`.
   * @param id ID of the table element.
   * @param columns The state of these table columns will be restored.
   * @returns True, if the state of at least one column has been restored.
   */
  export function restoreColumnState(id: string, columns: PropertyTableColumn[]): boolean {
    const state = LocalStorageController.getJson(LocalStorageController.KeyPrefix.Table_ColumnState, id);
    if (!state || typeof state !== 'object') return false;

    function helper(columns: PropertyTableColumn[], index: string = ''): boolean {
      if (!columns?.length) return false;

      let hasChanged: boolean = false;

      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        const indexI = (index ? index + '-' : '') + i;
        const propertyName = getPropertyName(column, indexI);

        if (state.hasOwnProperty(propertyName)) {
          hasChanged = restoreSingleColumnFromJson(column, state[propertyName]) || hasChanged;
        }

        if (column.isGroup) {
          hasChanged = helper(column.children, indexI) || hasChanged;
        }
      }

      return hasChanged;
    }

    return helper(columns);
  }

}