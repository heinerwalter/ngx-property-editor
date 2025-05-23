import { PEGlobalFunctions } from '../../controller/pe-global-functions';
import { Stringifier } from '../../controller/stringifier';
import { PropertyConfigurationFilterController } from '../property-table/controller/property-configuration-filter-controller';
import { PropertyEditorMode } from './property-editor-mode';
import { PropertyType } from './property-type';

/**
 * Some properties of `PropertyConfiguration` can be defined as constant type or
 * as function depending on the displayed data object.
 *
 * If defined as function, the currently displayed data object is passed as first
 * parameter and the current property editor mode is passed as second parameter.
 * Instead of the data object undefined is passed for empty objects (edit mode for
 * creating new data objects) or multiple data objects (table mode).
 */
type ValueOrFunctionType<T> = T | ((data: any | undefined, mode: PropertyEditorMode) => T);

export type PropertyConfigurationHiddenType = boolean | 'initially-hidden';

/**
 * Type of the parameter which can be passed to the `PropertyConfiguration` constructor.
 * This type contains all properties of the `PropertyConfiguration` class.
 * Thus, a `PropertyConfiguration` instance can be passed to the `PropertyConfiguration` constructor, too.
 */
export type PropertyConfigurationConstructorParameter = {
  /**
   * Is this property the primary key of the data?
   *
   * There must not be more than one property with `isPrimaryKey` set to true
   * in an array of all property configurations. If there is none, the data
   * array index is used as primary key instead.
   */
  isPrimaryKey?: boolean,

  /** Display the property value with this property name. */
  propertyName?: string,
  /** If defined this text is used instead of the `propertyName` as label. */
  label?: ValueOrFunctionType<string>,
  /**
   * An optional text which describes the meaning of this property.
   * In the property editor the `helpText` is displayed below the input element.
   */
  helpText?: string | undefined,

  /** Type of the property. Used for choosing an input component. */
  propertyType?: PropertyType,

  /**
   * Instead of evaluating a `propertyName`,
   * the displayed value can be generated using this function.
   * If defined, the `valueFunction` overrides the `propertyName` for retrieving the value.
   */
  valueFunction?: (data: any | undefined, mode: PropertyEditorMode) => any | undefined,
  /**
   * If the property is editable, instead of assigning a value to a property with the `propertyName`,
   * a new value can be assigned using this function.
   * If defined, the `setValueFunction` overrides the `propertyName` for assigning a new value.
   */
  setValueFunction?: (data: any, value: any) => void,

  /**
   * For use with `propertyType == 'select'`:
   * An array from which the user can select one or multiple items.
   *
   * For use with `propertyType == 'string'`:
   * In this case the `dataSource` is used for autocompletion
   * (see `TextInputComponent.autocompleteList`).
   * If defined and not empty, a list with recommendations is displayed
   * (similar to the select input) that can be selected to fill the text input.
   */
  dataSource?: ValueOrFunctionType<any[]>,
  /**
   * For use with `propertyType == 'select'`:
   * Evaluate this property name on the data source items
   * to get the values of the select input element items.
   * If undefined, the whole data source item is used as value.
   */
  valuePropertyName?: string | undefined,
  /**
   * For use with `propertyType == 'select'`:
   * Evaluate this property name on the data source items
   * to get a string which is displayed on the select input element items.
   * If undefined, the whole data source item is used as display value.
   */
  displayPropertyName?: string | undefined,

  /**
   * If `false`, this property is visible (if `hideIfEmpty` does not apply).
   * If `true`, this property is hidden.
   * If `'initially-hidden'`, this property is hidden, but it can be made visible
   * using a property chooser (especially for table mode).
   */
  hidden?: ValueOrFunctionType<PropertyConfigurationHiddenType>,
  /**
   * Only in `mode == 'view'`:
   * If true, this property is hidden, if its value is undefined, null,
   * an empty string or an empty array.
   */
  hideIfEmpty?: boolean,
  /** If true, this property is editable. */
  editable?: ValueOrFunctionType<boolean>,
  /** If true, this property is required. */
  required?: ValueOrFunctionType<boolean>,

  /** If defined, a goto-icon with this link is appended to the displayed value. */
  routerLink?: ValueOrFunctionType<any[] | string | undefined>,
  /**
   * If true, the `routerLink` is considered as pointing to an external web page.
   * In that case `routerLink` must be (evaluating to) a string.
   */
  routerLinkIsExternal?: ValueOrFunctionType<boolean | undefined>,
  /** Optional tooltip of the goto-icon (see `routerLink`). */
  routerLinkTooltip?: ValueOrFunctionType<string | undefined>,

  /** Bootstrap column width on md wide screens (class "col-md-..."). */
  md?: ValueOrFunctionType<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined>,
  /** Table column width in pixel. */
  columnWidth?: ValueOrFunctionType<number | undefined>,

  /**
   * Set `separator` to true, to add a separator between properties.
   * If `separator` is true, all other configuration values are ignored.
   */
  separator?: boolean,

  /**
   * If true, instead of a single item of the given `propertyType` multiple such items can be entered.
   */
  isArray?: boolean,
  /**
   * If `isArray` is true:
   * This function gets called, before a new item is added to the array property.
   * The result of this function is added to the array as new item. If this function
   * is not defined, `undefined` is added to the array as new item.
   *
   * The currently displayed data object which contains the array property is passed
   * as first parameter.
   */
  newArrayItemFunction?: ((data: any | undefined) => any) | undefined,

  /**
   * Group multiple properties under the label of this property configuration.
   * Warning: Only one level of grouping is supported. Groups within groups are ignored.
   *
   * How a group is displayed depends on the component used to display the properties:
   * - `PropertyViewComponent`:
   *   Display string values of multiple properties with one label. The outer array defines
   *   a vertical group (string values separated by linebreak). The inner array(s) define
   *   horizontal group(s) (string values separated by space). If you want to define only one
   *   horizontal group, the outer array should contain exactly one element
   *   (e.g. `[ [ property1, property2, ... ] ]`).
   * - `PropertyEditorComponent`/`PropertyInputWithGroupComponent`:
   *   Display multiple properties within an input group (input elements side by side
   *   with one label for the whole group). The outer array defines a vertical input group.
   *   The inner array(s) define horizontal input group(s). If you want to define only one
   *   horizontal input group, the outer array should contain exactly one element
   *  (e.g. `[ [ property1, property2, ... ] ]`).
   *
   *  @see disableGroup
   */
  group?: PropertyConfiguration[][],
  /**
   * If true, the property configurations within `group` are considered as normal properties without a group.
   * Thus, they are displayed instead of this property configuration.
   *
   * @example
   * // Example 1 (without disableGroup):
   * property1 = {
   *   group: [[property2, property3]],
   * }
   * // Properties displayed in a property editor:
   * // - property1 (with grouped properties property2 and property3)
   *
   * // Example 2 (with disableGroup):
   * property1 = {
   *   group: [[property2, property3]],
   *   disableGroup: true,
   * }
   * // Properties displayed in a property editor:
   * // - property2
   * // - property3
   *
   * @see group
   */
  disableGroup?: ValueOrFunctionType<boolean>,

};

/**
 * Configuration of how to display a property of a data object
 * in any property view or property editor.
 */
export class PropertyConfiguration implements PropertyConfigurationConstructorParameter {

  public isPrimaryKey: boolean = false;

  public propertyName?: string = undefined;
  public label?: ValueOrFunctionType<string> = undefined;
  public helpText?: string | undefined = undefined;

  public propertyType?: PropertyType = undefined;

  public valueFunction?: (data: any | undefined, mode: PropertyEditorMode) => any | undefined = undefined;
  public setValueFunction?: (data: any, value: any) => void = undefined;

  public dataSource?: ValueOrFunctionType<any[]> = undefined;
  public valuePropertyName?: string | undefined = undefined;
  public displayPropertyName?: string | undefined = undefined;

  public hidden?: ValueOrFunctionType<PropertyConfigurationHiddenType> = undefined;
  public hideIfEmpty: boolean = false;
  public editable?: ValueOrFunctionType<boolean> = undefined;
  public required?: ValueOrFunctionType<boolean> = undefined;

  public routerLink?: ValueOrFunctionType<any[] | string | undefined> = undefined;
  public routerLinkIsExternal?: ValueOrFunctionType<boolean> = undefined;
  public routerLinkTooltip?: ValueOrFunctionType<string | undefined> = undefined;

  public md?: ValueOrFunctionType<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined> = undefined;
  public columnWidth?: ValueOrFunctionType<number | undefined> = undefined;

  public separator: boolean = false;

  public isArray: boolean = false;
  public newArrayItemFunction?: ((data: any | undefined) => any) | undefined = undefined;

  public group?: PropertyConfiguration[][] = undefined;
  public disableGroup?: ValueOrFunctionType<boolean> = undefined;

  public constructor(configuration?: PropertyConfigurationConstructorParameter) {
    // Assign properties from configuration object if defined
    if (configuration) {
      const booleanPropertyNames: string[] = ['isPrimaryKey', 'hideIfEmpty', 'separator', 'isArray'];

      for (const propertyName in configuration) {
        // Skip properties which does not exist on configuration object or on this
        if (!configuration.hasOwnProperty(propertyName)) continue;
        if (!this.hasOwnProperty(propertyName)) continue;

        // Get property value from configuration object
        const configurationValue: any = (configuration as any)[propertyName];

        // Assign property value as boolean or unchanged
        if (booleanPropertyNames.includes(propertyName))
          (this as any)[propertyName] = !!configurationValue;
        else
          (this as any)[propertyName] = configurationValue;
      }
    }
  }

  /**
   * Gets the text which should be used as label (either `label` or `propertyName`).
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @returns The property label.
   */
  public getLabel(data: any | undefined, mode: PropertyEditorMode): string {
    if (typeof this.label === 'function') {
      return this.label(data, mode);
    } else {
      return this.label || this.propertyName || '';
    }
  }

  /**
   * Gets the property value from the given data object.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @returns The property value.
   */
  public getValue(data: any | undefined, mode: PropertyEditorMode): any {
    if (this.valueFunction) {
      return this.valueFunction(data, mode);
    } else if (this.propertyName) {
      return this.evaluateNestedPropertyName('get', data, this.propertyName);
    } else if (this.hasGroup) {
      return this.getDisplayValueOfGroup(data, mode);
    } else {
      return undefined;
    }
  }

  /**
   * Gets the joined property value of all properties in the `group` from the given data object.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @returns The joined property value of all properties in the `group`.
   */
  public getDisplayValueOfGroup(data: any | undefined, mode: PropertyEditorMode): string {
    if (!this.hasGroup) return '';

    // Iterate over outer array
    const outerArrayValues: string[] = [];
    for (const properties of this.group!) {
      if (!properties?.length) continue;

      // Iterate over inner array
      const innerArrayValues: string[] = [];
      for (const property of properties) {
        if (!property) continue;

        // Get property value as string
        let value = property.getDisplayValue(data, mode);
        if (Array.isArray(value)) {
          value = Stringifier.arrayToString(value, false, false);
        }
        value = value?.trim();
        if (!value) continue;

        innerArrayValues.push(value);
      }

      // Join inner array elements by space
      const value: string = innerArrayValues.join(' ');
      if (!value) continue;

      outerArrayValues.push(value);
    }

    // Join outer array elements by linebreak
    return outerArrayValues.join('\n') || '';
  }

  /**
   * Gets the display value from the given data object.
   * This function evaluates the `displayPropertyName` for select property types.
   * For any other property type the result of this function is the same as `getValue()`.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @param joinArray If true, array values are joined to a comma-separated string.
   * @returns The display value.
   */
  public getDisplayValue(data: any | undefined,
                         mode: PropertyEditorMode,
                         joinArray: boolean = false): string | string[] | undefined {
    // Get displayed value
    let propertyValue: any = this.getValue(data, mode);
    if (propertyValue == undefined) return undefined;

    // Evaluate data source, if property type is 'select'
    if (this.propertyType == 'select' &&
      this.valuePropertyName != this.displayPropertyName) {
      const dataSource = this.getDataSource(data, mode);

      const evaluateDisplayPropertyName = (value: any): any => {
        if (dataSource) {
          const item = PEGlobalFunctions.getDataSourceItem(dataSource, this.valuePropertyName, value);
          const itemValue = PEGlobalFunctions.evaluateDisplayPropertyName(this.displayPropertyName, item);
          if (itemValue)
            return itemValue;
        }
        return value;
      };

      if (this.isArray && Array.isArray(propertyValue)) {
        propertyValue = propertyValue.map(value => evaluateDisplayPropertyName(value));
      } else {
        propertyValue = evaluateDisplayPropertyName(propertyValue);
      }
    }

    // If propertyValue is an array, remove undefined items
    if (this.isArray && Array.isArray(propertyValue)) {
      propertyValue = propertyValue
        .filter(item => item != undefined);
      // Return undefined instead of an empty array
      if (!propertyValue.length)
        return undefined;
    }

    // Return propertyValue as string (or array of strings)
    if (!joinArray && this.isArray && Array.isArray(propertyValue)) {
      return propertyValue
        .map(item => Stringifier.propertyTypeToString(item, this.propertyType));
    } else {
      return Stringifier.propertyTypeToString(propertyValue, this.propertyType);
    }
  }

  private evaluateNestedPropertyName(method: 'get' | 'set', data: any, propertyName: string, value: any = undefined): any {
    if (!propertyName?.trim() || !data || typeof data !== 'object') return undefined;

    // Split property name by '.' and evaluate it on nested objects
    const propertyNameSegments: string[] = propertyName.split('.').map(s => s.trim());
    for (let i = 0; i < propertyNameSegments.length; i++) {
      const propertyNameSegment = propertyNameSegments[i];
      if (!propertyNameSegment)
        throw new Error(`Cannot ${method} value of property name with empty segment: ${propertyName}.`);
      if (!data || typeof data !== 'object')
        throw new Error(`Cannot ${method} value of undefined. Trying to evaluate segment ${propertyNameSegment} of property name ${propertyName}.`);

      if (i < propertyNameSegments.length - 1) {
        data = data[propertyNameSegment];

      } else {
        switch (method) {
          case 'get':
            return data[propertyNameSegment];
          case 'set':
            data[propertyNameSegment] = value;
            return;
        }
      }
    }
  }

  /**
   * Assigns a new property value to the given data object.
   * @param data The data object.
   * @param value The new property value.
   */
  public setValue(data: any, value: any): void {
    if (this.setValueFunction) {
      this.setValueFunction(data, value);
    } else if (this.propertyName) {
      this.evaluateNestedPropertyName('set', data, this.propertyName, value);
    }
  }

  /**
   * Evaluates the given filter expression on the property value.
   * @param data The data object.
   * @param mode Property editor mode used to evaluate the property value.
   * @param filter A filter expression as string.
   * @returns True, if the filter matches.
   *          If the `filter` is empty, true is returned.
   *          If the property configuration is empty or its `propertyType`
   *          does not support filtering, false is returned.
   */
  public evaluateFilter(data: any, mode: PropertyEditorMode, filter: string): boolean {
    return PropertyConfigurationFilterController.evaluateFilter(this, data, mode, filter);
  }

  /**
   * For use with `propertyType == 'select'`:
   * Evaluates the `dataSource` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @returns An array from which the user can select one or multiple items.
   */
  public getDataSource(data: any | undefined, mode: PropertyEditorMode): any[] {
    if (typeof this.dataSource === 'function') {
      return this.dataSource(data, mode);
    } else {
      return this.dataSource || [];
    }
  }

  /**
   * For use with `propertyType == 'text'` etc.:
   * Evaluates the `dataSource` configuration and applies the `displayPropertyName`
   * on each data source item to get an array of strings which can be used as autocomplete list
   * for text input elements.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @returns An array from which the user can select an item.
   */
  public getDataSourceDisplayValues(data: any | undefined, mode: PropertyEditorMode): string[] {
    const dataSource = this.getDataSource(data, mode);
    if (!dataSource?.length) return [];
    return dataSource.map(item => PEGlobalFunctions.evaluateDisplayPropertyName(this.displayPropertyName, item))
  }

  /**
   * Gets whether this property should be hidden based on `hidden`, `hideIfEmpty` and the value.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @param ignoreHideIfEmpty If true, `hideIfEmpty` is not evaluated.
   * @returns true, if this property is hidden.
   */
  public isHidden(data: any | undefined,
                  mode: PropertyEditorMode,
                  ignoreHideIfEmpty: boolean = false): PropertyConfigurationHiddenType {
    // Evaluate `hideIfEmpty` (only in view mode)
    if (!ignoreHideIfEmpty && mode == 'view' && this.hideIfEmpty) {
      const value = this.getValue(data, mode);
      if (
        // undefined or null is always considered empty
        value == undefined ||
        // Empty strings are considered empty
        (typeof value === 'string' && !value) ||
        // Empty arrays are considered empty
        (Array.isArray(value) && !value.length)
      )
        return true;
    }

    // Evaluate `hidden`
    let result: PropertyConfigurationHiddenType = false;
    if (typeof this.hidden === 'function') {
      result = this.hidden(data, mode);
    } else if (this.hidden != undefined) {
      result = this.hidden;
    }

    // 'initially-hidden' is only valid in table mode; otherwise it is changed to false (visible)
    if (result == 'initially-hidden' && mode != 'table') {
      result = false;
    }

    return result;
  }

  /**
   * Evaluates the `editable` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @returns true, if this property is editable.
   */
  public isEditable(data: any | undefined, mode: PropertyEditorMode): boolean {
    if (typeof this.editable === 'function') {
      return this.editable(data, mode);
    } else {
      return this.editable || false;
    }
  }

  /**
   * Evaluates the `required` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @returns true, if this property is required.
   */
  public isRequired(data: any | undefined, mode: PropertyEditorMode): boolean {
    if (typeof this.required === 'function') {
      return this.required(data, mode);
    } else {
      return this.required || false;
    }
  }

  /**
   * Evaluates the `routerLink` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @returns A router link.
   */
  public getRouterLink(data: any | undefined, mode: PropertyEditorMode): any[] | string | undefined {
    if (typeof this.routerLink === 'function') {
      return this.routerLink(data, mode);
    } else {
      return this.routerLink;
    }
  }

  /**
   * Evaluates the `routerLinkIsExternal` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @returns True if the router link points to an external site.
   */
  public getRouterLinkIsExternal(data: any | undefined, mode: PropertyEditorMode): boolean {
    if (typeof this.routerLinkIsExternal === 'function') {
      return this.routerLinkIsExternal(data, mode);
    } else {
      return this.routerLinkIsExternal || false;
    }
  }

  /**
   * Evaluates the `routerLinkTooltip` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @returns Tooltip of the router link.
   */
  public getRouterLinkTooltip(data: any | undefined, mode: PropertyEditorMode): string | undefined {
    if (typeof this.routerLinkTooltip === 'function') {
      return this.routerLinkTooltip(data, mode);
    } else {
      return this.routerLinkTooltip;
    }
  }

  /**
   * Evaluates the `md` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @returns Bootstrap column width for 'col-md-...' class.
   */
  public getBootstrapColumnMD(data: any | undefined, mode: PropertyEditorMode): 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined {
    if (typeof this.md === 'function') {
      return this.md(data, mode) || 12;
    } else {
      return this.md || 12;
    }
  }

  /**
   * Returns a bootstrap column css class based on the `md` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @returns Bootstrap column class 'col-md-...'.
   */
  public getBootstrapColumnClass(data: any | undefined, mode: PropertyEditorMode): string {
    let md = this.getBootstrapColumnMD(data, mode);
    return `col-md-${md || 12}`;
  }

  /**
   * Evaluates the `columnWidth` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @returns Table column width in pixel.
   */
  public getColumnWidth(data: any | undefined, mode: PropertyEditorMode): number | undefined {
    if (typeof this.columnWidth === 'function') {
      return this.columnWidth(data, mode) || undefined;
    } else {
      return this.columnWidth || undefined;
    }
  }

  /**
   * Creates a new `PropertyConfiguration` instance for the item of an array property (`isArray == true`).
   * @param index Index of the array item.
   * @param value Current value of the array item.
   * @param onValueChange A function which is called, when the array item was changed.
   */
  public getArrayItemConfiguration(index: number, value: any, onValueChange: ((itemValue: any) => void)): PropertyConfiguration {
    if (!this.isArray) return this;

    const itemConfig: PropertyConfiguration = new PropertyConfiguration(this);

    itemConfig.isArray = false;
    itemConfig.propertyName = undefined;
    itemConfig.valueFunction = (data: any) => value;
    itemConfig.setValueFunction = (data: any, newValue: any) => onValueChange(newValue);

    return itemConfig;
  }

  /**
   * Returns true, if a `group` of nested property configurations exists
   * (with at least one nested property configuration).
   */
  public get hasGroup(): boolean {
    if (!this.group?.length) return false;
    return this.group.some(array => array?.length);
  }

  /**
   * Returns all property configurations of `group` in a flat array (one dimension).
   */
  public get flatGroup(): PropertyConfiguration[] {
    if (!this.group?.length) return [];
    return this.group.flat(1);
  }

  /**
   * Evaluates the `disableGroup` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param mode Property editor mode.
   * @returns true, if the property configurations within `group` are considered as normal properties without a group.
   */
  public getDisableGroup(data: any | undefined, mode: PropertyEditorMode): boolean {
    if (typeof this.disableGroup === 'function') {
      return this.disableGroup(data, mode) || false;
    } else {
      return this.disableGroup || false;
    }
  }

}

/**
 * Configuration of a separator displayed
 * in any property view or property editor.
 */
export class PropertyConfigurationSeparator extends PropertyConfiguration {

  public override readonly separator: boolean = true;

  public override readonly md: ValueOrFunctionType<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined> = 12;

  public constructor(configuration?: {
    /** If true, this property is hidden. */
    hidden?: boolean,
  }) {
    super(configuration);
  }

  public override isHidden(data: any, mode: PropertyEditorMode, ignoreHideIfEmpty?: boolean): PropertyConfigurationHiddenType {
    // Don't show separators in table mode
    if (mode == 'table') return true;
    return super.isHidden(data, mode, ignoreHideIfEmpty);
  }

  public override getBootstrapColumnMD(data: any | undefined): 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined {
    // Always display a separator across the whole width
    return 12;
  }

}
