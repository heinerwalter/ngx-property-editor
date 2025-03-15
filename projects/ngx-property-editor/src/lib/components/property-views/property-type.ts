/**
 * Possible property types of property configurations.
 */
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
  /** Year number. */
  'year' |
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
  /** ISO 639 language code (two character string).
   *  Language is displayed using the https://www.npmjs.com/package/language-icons (see `LanguageIconComponent`). */
  'language' |
  /** ISO 3166 country code (string, either the two or three character code or the full country name). */
  'country' |
  /** Internally a string property edited using a URL input. */
  'url' |
  /** Internally a string property edited using a color picker. */
  'color' |
  /** Star rating (positive integer value). */
  'rating' |
  /** Difficulty icon rating (positive integer value). */
  'difficulty' |
  /** Select an item from a `dataSource`. */
  'select' |
  /**
   * A button triggering the `setValueFunction`.
   * The `label` is displayed as button text,
   * the `routerLinkTooltip` is displayed as button tooltip,
   * and the button is enabled when `editable`.
   */
  'button';

/**
 * Returns true, if the given property type requires boolean values.
 * @param propertyType A property type.
 */
export function propertyTypeIsBoolean(propertyType: PropertyType): boolean {
  switch (propertyType) {
    case 'boolean':
    case 'boolean-indeterminate':
      return true;
    default:
      return false;
  }
}

/**
 * Returns true, if the given property type requires date values.
 * @param propertyType A property type.
 */
export function propertyTypeIsDate(propertyType: PropertyType): boolean {
  switch (propertyType) {
    case 'date':
    case 'datetime':
    case 'time':
    case 'month':
      return true;
    default:
      return false;
  }
}

/**
 * Returns true, if the given property type requires numeric values.
 * @param propertyType A property type.
 */
export function propertyTypeIsNumber(propertyType: PropertyType): boolean {
  switch (propertyType) {
    case 'number':
    case 'rating':
    case 'difficulty':
    case 'year':
      return true;
    default:
      return false;
  }
}

/**
 * Returns true, if the given property type requires string values.
 * @param propertyType A property type.
 */
export function propertyTypeIsString(propertyType: PropertyType): boolean {
  switch (propertyType) {
    case 'string':
    case 'id':
    case 'string-multiline':
    case 'tel':
    case 'email':
    case 'language':
    case 'country':
    case 'url':
    case 'color':
    case 'password':
      return true;
    default:
      return false;
  }
}

/**
 * Automatically determines a property type for use in a `PropertyConfiguration`
 * from the given value.
 * @param propertyValue Value of a property.
 * @returns Automatically detected property type matching the given value.
 */
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
