import { Stringifier } from "./stringifier";

/**
 * This module provides functions for saving the application state in the `localStorage`. 
 */
export namespace LocalStorageController {

  export enum KeyPrefix {
    CollapseComponent_IsCollapsed = 'collapse-box-is-collapsed-', // Type: boolean
    ItemView_DefaultItemLabel = 'item-view-default-item-label-', // Type: string
    Table_ColumnState = 'table-column-state-', // Type: JSON object
  }

  function generateKey(type: KeyPrefix, id: string): string {
    return type + id;
  }

  export function getString(type: KeyPrefix, id: string): string | undefined {
    if (!type || !id) return undefined;
    return localStorage.getItem(generateKey(type, id)) ?? undefined;
  }

  export function setString(type: KeyPrefix, id: string, value: string): boolean{
    if (!type || !id) return false;
    localStorage.setItem(generateKey(type, id), value);
    return true;
  }

  export function getBoolean(type: KeyPrefix, id: string): boolean | undefined {
    const stringValue: string | undefined = getString(type, id);
    if (!stringValue) return undefined;
    return Stringifier.stringToBoolean(stringValue);
  }

  export function setBoolean(type: KeyPrefix, id: string, value: boolean): boolean {
    return setString(type, id, value.toString());
  }

  export function getJson(type: KeyPrefix, id: string): any | undefined {
    const stringValue: string | undefined = getString(type, id);
    if (!stringValue) return undefined;
    try {
      return JSON.parse(stringValue);
    } catch {
      return undefined;
    }
  }

  export function setJson(type: KeyPrefix, id: string, value: any): boolean {
    try {
      return setString(type, id, JSON.stringify(value));
    } catch {
      return false;
    }
  }

}
