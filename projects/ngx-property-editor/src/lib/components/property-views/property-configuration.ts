import { PEGlobalFunctions } from '../../controller/pe-global-functions';
import { Stringifier } from '../../controller/stringifier';

export type PropertyType =
/** Boolean (true/false). */
  'boolean' |
  /** Boolean with indeterminate state (true/false/undefined). */
  'boolean-indeterminate' |
  /** Date (no time). */
  'date' |
  /** Date and time. */
  'datetime' |
  /** Time. */
  'time' |
  /** Month and year. */
  'month' |
  /** Number. */
  'number' |
  /** String edited using a single line text input. */
  'string' |
  /** For now same behavior as 'string'. Only for database ID properties 'id' should be used instead of 'string'. */
  'id' |
  /** String edited using a multiline textarea. */
  'string-multiline' |
  /** Internally a string property edited using a password input. */
  'password' |
  /** Internally a string property edited using a phone input. */
  'tel' |
  /** Internally a string property edited using an email address input. */
  'email' |
  /** Internally a string property edited using a URL input. */
  'url' |
  /** Internally a string property edited using a color picker. */
  'color' |
  /** Star rating. */
  'rating' |
  /** Select an item from a `dataSource`. */
  'select';

/**
 * Some properties of `PropertyConfiguration` can be defined as constant type or
 * as function depending on the displayed data object. If defined as function,
 * undefined is passed as data object for empty or multiple data objects.
 */
type ValueOrFunctionType<T> = T | ((data: any | undefined) => T);

/**
 * Type of the parameter which can be passed to the `PropertyConfiguration` constructor.
 * This type contains all properties of the `PropertyConfiguration` class.
 * Thus, a `PropertyConfiguration` instance can be passed to the `PropertyConfiguration` constructor, too.
 */
export type PropertyConfigurationConstructorParameter = {
  /** Display the property value with this property name. */
  propertyName?: string,
  /** If defined this text is used instead of the `propertyName` as label. */
  label?: ValueOrFunctionType<string>,

  /** Type of the property. Used for choosing an input component. */
  propertyType?: PropertyType,

  /**
   * Instead of evaluating a `propertyName`,
   * the displayed value can be generated using this function.
   * If defined, the `valueFunction` overrides the `propertyName` for retrieving the value.
   */
  valueFunction?: (data: any) => any | undefined,
  /**
   * If the property is editable, instead of assigning a value to a property with the `propertyName`,
   * a new value can be assigned using this function.
   * If defined, the `setValueFunction` overrides the `propertyName` for assigning a new value.
   */
  setValueFunction?: (data: any, value: any) => void,

  /**
   * For use with `propertyType == 'select'`:
   * An array from which the user can select one or multiple items.
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

  /** If true, this property is hidden. */
  hidden?: ValueOrFunctionType<boolean>,
  /** If true, this property is hidden, if its value is undefined. */
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
   * This function gets called, when a new item is added to the array.
   * If not defined, undefined is added as new item.
   */
  newArrayItemFunction?: (() => any) | undefined,

  /**
   * Display multiple properties within an input group
   * (input elements side by side with one label for the whole group).
   * The outer array defines a vertical input group.
   * The inner array(s) define horizontal input groups.
   * If you want to define only one horizontal input group,
   * the outer array should contain exactly one element (`[ [ input1, input2, ... ] ]`).
   */
  inputGroup?: PropertyConfiguration[][],

};

export class PropertyConfiguration implements PropertyConfigurationConstructorParameter {

  public propertyName?: string;
  public label?: ValueOrFunctionType<string>;

  public propertyType?: PropertyType;

  public valueFunction?: (data: any) => any | undefined;
  public setValueFunction?: (data: any, value: any) => void;

  public dataSource?: ValueOrFunctionType<any[]>;
  public valuePropertyName?: string | undefined;
  public displayPropertyName?: string | undefined;

  public hidden?: ValueOrFunctionType<boolean>;
  public hideIfEmpty?: boolean;
  public editable?: ValueOrFunctionType<boolean>;
  public required?: ValueOrFunctionType<boolean>;

  public routerLink?: ValueOrFunctionType<any[] | string | undefined>;
  public routerLinkIsExternal?: ValueOrFunctionType<boolean | undefined>;
  public routerLinkTooltip?: ValueOrFunctionType<string | undefined>;

  public md?: ValueOrFunctionType<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined>;

  public separator?: boolean;

  public isArray: boolean = false;
  public newArrayItemFunction?: (() => any) | undefined = undefined;

  public inputGroup?: PropertyConfiguration[][];

  public constructor(configuration?: PropertyConfigurationConstructorParameter) {
    Object.assign(this, configuration);
  }

  /**
   * Gets the text which should be used as label (either `label` or `propertyName`).
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @returns The property label.
   */
  public getLabel(data: any | undefined): string {
    if (typeof this.label === 'function') {
      return this.label(data);
    } else {
      return this.label || this.propertyName || '';
    }
  }

  /**
   * Gets the property value from the given data object.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @returns The property value.
   */
  public getValue(data: any | undefined): any {
    if (this.valueFunction) {
      return this.valueFunction(data);
    } else if (this.propertyName) {
      return this.evaluateNestedPropertyName('get', data, this.propertyName);
    } else {
      return undefined;
    }
  }

  /**
   * Gets the display value from the given data object.
   * This function evaluates the `displayPropertyName` for select property types.
   * For any other property type the result of this function is the same as `getValue()`.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @returns The display value.
   */
  public getDisplayValue(data: any | undefined): string | string[] | undefined {
    // Get displayed value
    let propertyValue: any = this.getValue(data);
    if (propertyValue == undefined) return undefined;

    // Evaluate data source, if property type is 'select'
    if (this.propertyType == 'select' &&
      this.valuePropertyName != this.displayPropertyName) {
      const dataSource = this.getDataSource(data);

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
    if (this.isArray && Array.isArray(propertyValue)) {
      return propertyValue
        .map(item => Stringifier.anyTypeToString(item));
    } else {
      return Stringifier.anyTypeToString(propertyValue);
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
   * For use with `propertyType == 'select'`:
   * Evaluates the `dataSource` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @returns An array from which the user can select one or multiple items.
   */
  public getDataSource(data: any | undefined): any[] {
    if (typeof this.dataSource === 'function') {
      return this.dataSource(data);
    } else {
      return this.dataSource || [];
    }
  }

  /**
   * Gets whether this property should be hidden based on `hidden`, `hideIfEmpty` and the value.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @param ignoreHideIfEmpty if true, the `hideIfEmpty` configuration is ignored.
   */
  public isHidden(data: any | undefined, ignoreHideIfEmpty: boolean = false): boolean {
    if (typeof this.hidden === 'function') {
      return this.hidden(data);
    } else if (this.hidden) {
      return true;
    } else if (!ignoreHideIfEmpty && this.hideIfEmpty && this.getValue(data) == undefined) {
      return true;
    }
    return false;
  }

  /**
   * Evaluates the `editable` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @returns true, if this property is editable.
   */
  public isEditable(data: any | undefined): boolean {
    if (typeof this.editable === 'function') {
      return this.editable(data);
    } else {
      return this.editable || false;
    }
  }

  /**
   * Evaluates the `required` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @returns true, if this property is required.
   */
  public isRequired(data: any | undefined): boolean {
    if (typeof this.required === 'function') {
      return this.required(data);
    } else {
      return this.required || false;
    }
  }

  /**
   * Evaluates the `routerLink` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   */
  public getRouterLink(data: any | undefined): any[] | string | undefined {
    if (typeof this.routerLink === 'function') {
      return this.routerLink(data);
    } else {
      return this.routerLink;
    }
  }

  /**
   * Evaluates the `routerLinkIsExternal` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   */
  public getRouterLinkIsExternal(data: any | undefined): boolean | undefined {
    if (typeof this.routerLinkIsExternal === 'function') {
      return this.routerLinkIsExternal(data);
    } else {
      return this.routerLinkIsExternal;
    }
  }

  /**
   * Evaluates the `routerLinkTooltip` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   */
  public getRouterLinkTooltip(data: any | undefined): string | undefined {
    if (typeof this.routerLinkTooltip === 'function') {
      return this.routerLinkTooltip(data);
    } else {
      return this.routerLinkTooltip;
    }
  }

  /**
   * Evaluates the `md` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   */
  public getBootstrapColumnMD(data: any | undefined): 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined {
    if (typeof this.md === 'function') {
      return this.md(data) || 12;
    } else {
      return this.md || 12;
    }
  }

  /**
   * Returns a bootstrap column css class based on the `md` configuration.
   * @param data The data object. Undefined is passed for empty or multiple objects.
   * @returns 'col' or 'col-md-...'.
   */
  public getBootstrapColumnClass(data: any | undefined): string {
    let md = this.getBootstrapColumnMD(data);
    return `col-md-${md || 12}`;
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

}

export class PropertyConfigurationSeparator extends PropertyConfiguration {

  public override readonly separator: boolean = true;

  public constructor(configuration?: {
    /** If true, this property is hidden. */
    hidden?: boolean,
  }) {
    super(configuration);
  }

}

export type PropertiesConfiguration = PropertyConfiguration[];


export function generatePropertyTypeFromData(propertyValue: any): PropertyType | undefined {
  // If the given value is an array with at least one element,
  // generate the property type from the first element (and set `isArray` to true).
  if (Array.isArray(propertyValue) && propertyValue?.length) {
    propertyValue = propertyValue[0];
  }

  switch (typeof propertyValue) {
    case 'boolean':
      return 'boolean';
    case 'number':
    case 'bigint':
      return 'number';
    case 'string':
      if (propertyValue.includes('\n'))
        return 'string-multiline';
      else if (propertyValue.includes('@'))
        return 'email';
      return 'string';

    case 'object':
      if (propertyValue instanceof Date)
        return 'date';
      return undefined;

    case 'function':
      try {
        return generatePropertyTypeFromData(propertyValue());
      } catch {
        return undefined;
      }

    case 'undefined':
    case 'symbol':
    default:
      return undefined;
  }
}

/**
 * Generates a `PropertiesConfiguration` from the properties of the given data object.
 * @param data A data object to be displayed by a property table or property editor.
 * @param editable If true, all properties are editable.
 */
export function generatePropertiesConfigurationFromData(data: any | undefined = undefined,
                                                        editable: boolean = false): PropertiesConfiguration {
  if (!data) return [];

  return Object.getOwnPropertyNames(data)
    .map(propertyName => {
      const propertyType: PropertyType | undefined = generatePropertyTypeFromData(data[propertyName]);
      return new PropertyConfiguration({
        propertyName: propertyName,
        propertyType: propertyType || 'string',
        isArray: Array.isArray(data[propertyName]),
        hidden: propertyType == undefined,
        editable: editable,
      });
    });
}
