import { LocalStorageController } from '../../../controller/local-storage-controller';
import { PropertyTableColumn } from "../property-table-column";

/**
 * This module provides functions for saving and restoring
 * the state of a `PropertyTableComponent`.
 */
export namespace PropertyTableStateSaveController {

  export type ColumnState = {
    /** Property name, or index in the columns array, if no property name exists. */
    propertyName: string | number;
    isVisible: boolean;
    order: number | undefined;
    width: number | undefined;
  }

  /**
   * Generates a JSON object describing the current state of the given
   * property table columns. The state contains visibility, order and width
   * of the columns. The result of this function can be saved and resored later.
   * @param columns The state of these table columns will be saved.
   * @returns Column state as JSON object.
   */
  export function columnStateToJson(columns: PropertyTableColumn[]): ColumnState[] {
    if (!columns?.length) return [];

    const state: ColumnState[] = [];
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (!column || column?.specialType) continue;

      state.push({
        propertyName: column.property?.propertyName || i,
        isVisible: column.isVisible,
        order: column.index || undefined,
        width: undefined,
      });
    }
    return state;
  }

  /**
   * Saves the 
   * @param id ID of the table element.
   * @param columns The state of these table columns will be saved.
   * @returns True, if the column state has been saved successfully.
   */
  export function saveColumnState(id: string, columns: PropertyTableColumn[]): boolean {
    const state = columnStateToJson(columns);
    return LocalStorageController.setJson(LocalStorageController.KeyPrefix.Table_ColumnState, id, state);
  }

}