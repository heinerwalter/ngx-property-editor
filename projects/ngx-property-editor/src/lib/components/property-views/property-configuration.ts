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

type ValueOrFunctionType<T> = T | ((data: any) => T);

type PropertyConfigurationType = {
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
  setValueFunction?: (data: any, value: any) => void;

  /**
   * For use with `propertyType == 'select'`:
   * An array from which the user can select one or multiple items.
   */
  dataSource?: ValueOrFunctionType<{ [key: string]: any }[]>;
  /**
   * For use with `propertyType == 'select'`:
   * Evaluate this property name on the data source items
   * to get the values of the select input element items.
   * If undefined, the whole data source item is used as value.
   */
  valuePropertyName?: string | undefined;
  /**
   * For use with `propertyType == 'select'`:
   * Evaluate this property name on the data source items
   * to get a string which is displayed on the select input element items.
   * If undefined, the whole data source item is used as display value.
   */
  displayPropertyName?: string | undefined;

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
  /** Optional tooltip of the goto-icon (see `routerLink`). */
  routerLinkTooltip?: ValueOrFunctionType<string | undefined>,

  /** Bootstrap column width on md wide screens (class "col-md-..."). */
  md?: ValueOrFunctionType<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined>;

  /**
   * Set `separator` to true, to add a separator between properties.
   * If `separator` is true, all other configuration values are ignored.
   */
  separator?: boolean,
};

export class PropertyConfiguration implements PropertyConfigurationType {

  public propertyName?: string;
  public label?: ValueOrFunctionType<string>;

  public propertyType?: PropertyType;

  public valueFunction?: (data: any) => any | undefined;
  public setValueFunction?: (data: any, value: any) => void;

  public dataSource?: ValueOrFunctionType<{ [key: string]: any }[]>;
  public valuePropertyName?: string | undefined;
  public displayPropertyName?: string | undefined;

  public hidden?: ValueOrFunctionType<boolean>;
  public hideIfEmpty?: boolean;
  public editable?: ValueOrFunctionType<boolean>;
  public required?: ValueOrFunctionType<boolean>;

  public routerLink?: ValueOrFunctionType<any[] | string | undefined>;
  public routerLinkTooltip?: ValueOrFunctionType<string | undefined>;

  public md?: ValueOrFunctionType<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined>;

  public separator?: boolean;

  public constructor(configuration?: PropertyConfigurationType) {
    Object.assign(this, configuration);
  }

  /**
   * Gets the text which should be used as label (either `label` or `propertyName`).
   * @param data The data object.
   * @returns The property label.
   */
  public getLabel(data: any): string {
    if (typeof this.label === 'function') {
      return this.label(data);
    } else {
      return this.label || this.propertyName || '';
    }
  }

  /**
   * Gets the property value from the given data object.
   * @param data The data object.
   * @returns The property value.
   */
  public getValue(data: any): any {
    if (this.valueFunction) {
      return this.valueFunction(data);
    } else if (this.propertyName) {
      return this.evaluateNestedPropertyName('get', data, this.propertyName);
    } else {
      return undefined;
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
   * @param data The data object.
   * @returns An array from which the user can select one or multiple items.
   */
  public getDataSource(data: any): { [key: string]: any }[] {
    if (typeof this.dataSource === 'function') {
      return this.dataSource(data);
    } else {
      return this.dataSource || [];
    }
  }

  /**
   * Gets whether this property should be hidden based on `hidden`, `hideIfEmpty` and the value.
   * @param data The data object.
   * @param ignoreHideIfEmpty if true, the `hideIfEmpty` configuration is ignored.
   */
  public isHidden(data: any, ignoreHideIfEmpty: boolean = false): boolean {
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
   * @param data The data object.
   * @returns true, if this property is editable.
   */
  public isEditable(data: any): boolean {
    if (typeof this.editable === 'function') {
      return this.editable(data);
    } else {
      return this.editable || false;
    }
  }

  /**
   * Evaluates the `required` configuration.
   * @param data The data object.
   * @returns true, if this property is required.
   */
  public isRequired(data: any): boolean {
    if (typeof this.required === 'function') {
      return this.required(data);
    } else {
      return this.required || false;
    }
  }

  /**
   * Evaluates the `routerLink` configuration.
   * @param data The data object.
   */
  public getRouterLink(data: any): any[] | string | undefined {
    if (typeof this.routerLink === 'function') {
      return this.routerLink(data);
    } else {
      return this.routerLink;
    }
  }

  /**
   * Evaluates the `routerLinkTooltip` configuration.
   * @param data The data object.
   */
  public getRouterLinkTooltip(data: any): string | undefined {
    if (typeof this.routerLinkTooltip === 'function') {
      return this.routerLinkTooltip(data);
    } else {
      return this.routerLinkTooltip;
    }
  }

  /**
   * Evaluates the `md` configuration.
   * @param data The data object.
   */
  public getBootstrapColumnMD(data: any): 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined {
    if (typeof this.md === 'function') {
      return this.md(data) || 12;
    } else {
      return this.md || 12;
    }
  }

  /**
   * Returns a bootstrap column css class based on the `md` configuration.
   * @param data The data object.
   * @returns 'col' or 'col-md-...'.
   */
  public getBootstrapColumnClass(data: any): string {
    let md = this.getBootstrapColumnMD(data);
    if (md == undefined)
      return 'col';
    return `col-md-${md}`;
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
        hidden: propertyType == undefined,
        editable: editable,
      });
    });
}
