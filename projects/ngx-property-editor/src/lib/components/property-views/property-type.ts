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
  /** Internally a string property edited using a URL input. */
  'url' |
  /** ISO 639 language code (two character string).
   *  Language is displayed using the https://www.npmjs.com/package/language-icons (see `LanguageIconComponent`). */
  'language' |
  /** ISO 3166 country code (two character string). */
  'country' |
  /** Internally a string property edited using a color picker. */
  'color' |
  /** Internally a string property edited using a select input for selecting predefined bootstrap color classes. */
  'color-class' |
  /** Internally a string property edited using a select input for selecting FontAwesome icons. */
  'icon' |
  /** Star rating (positive integer value). */
  'rating' |
  /** Difficulty icon rating (positive integer value). */
  'difficulty' |
  /** Select an item from a `dataSource`. */
  'select' |
  /**
   * A button triggering the `setValueFunction` or the `routerLink` (if `setValueFunction == undefined`).
   * The `label` is displayed as button text,
   * the `routerLinkTooltip` is displayed as button tooltip.
   */
  'button';


/** Returns all possible `PropertyType` values. */
export const PropertyTypeOptions: PropertyType[] = [
  'boolean',
  'boolean-indeterminate',
  'date',
  'datetime',
  'time',
  'month',
  'year',
  'number',
  'string',
  'id',
  'string-multiline',
  'password',
  'tel',
  'email',
  'url',
  'language',
  'country',
  'color',
  'color-class',
  'icon',
  'rating',
  'difficulty',
  'select',
  'button',
];


/**
 * Possible property value data types of property configurations.
 * Different `PropertyType`s share the same `PropertyValueDataType`
 * but use different visualizations.
 * @see getPropertyTypeDataType
 */
export type PropertyValueDataType = 'boolean' | 'date' | 'number' | 'string';
