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

  function getPropertyName(column: PropertyTableColumn): string {
    return column.property?.propertyName || i.toString();
  }
 
  /**
   * Generates a JSON object describing the current state of the given single
   * property table column. The state contains visibility, order and width
   * of the column . The result of this function can be saved and resored later.
   * @param column The state object of this table column will be generated.
   * @returns Column state as JSON object.
   */
  function singleColumnStateToJson(column: PropertyTableColumn): SingleColumnState | undefined {
    if (!column || column?.specialType) continue;

    return {
      propertyName: getPropertyName(column),
      isVisible: column.isVisible,
      order: column.index || undefined,
      width: undefined,
    };
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
 
    function helper(columns: PropertyTableColumn[]): SingleColumnState[] {
      const array: SingleColumnState[] = [];
      if (!columns?.length) return array;
      
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
  
        const columnsState = singleColumnStateToJson(column);
        if (columnsState)
          array.push(columnsState);

        if (column.isGroup) {
          array.push(...helper(column.children));
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

}