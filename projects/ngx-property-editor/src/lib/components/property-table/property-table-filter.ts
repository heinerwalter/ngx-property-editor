import { PropertyConfiguration } from '../property-views/property-configuration';

/**
 * Definition of a filter on a single property configuration or property table column.
 */
export class PropertyFilter {
  
  /**
   * A property configuration.
   * The filter is applied on the value of this property.
   */
  public property: PropertyConfiguration;

  /**
   * The filter expression.
   * Filters with empty or undefined filter expressions are ignored.
   */
  public filter: string = '';

  public constructor(
    propertyConfiguration: PropertyConfiguration,
  ) {
    this.property = propertyConfiguration;
  }

}


/**
 * Definition of filters on multiple columns of a property table.
 * Each entry in this object represents a filter on a single table column.
 *
 * The key of each entry is the `propertyName` of the property configuration
 * related to the filtered table column. If it does not contain a property name,
 * a random string containing the column index is used as key instead.
 * 
 * The value of each entry is a `PropertyFilter` object containing the
 * property configuration (which is used to evaluate the filter) and
 * a filter expression.
 */
export type PropertyTableFilter = { [key: string]: PropertyFilter };
