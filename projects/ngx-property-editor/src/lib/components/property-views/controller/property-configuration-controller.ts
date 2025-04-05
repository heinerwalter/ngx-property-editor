import { PropertyType } from '../property-type';
import { PropertyConfiguration } from '../property-configuration';
import { PropertyTypeController } from './property-type-controller';

export namespace PropertyConfigurationController {

  /**
   * Generates a `PropertyConfiguration` array from the properties of the given data object.
   * @param data A data object to be displayed by a property table or property editor.
   * @param editable If true, all properties are editable.
   */
  export function generatePropertyConfigurationsFromData(
    data: any | undefined = undefined,
    editable: boolean = false
  ): PropertyConfiguration[] {
    if (!data) return [];

    return Object.getOwnPropertyNames(data)
      .map(propertyName => {
        const propertyType: PropertyType | undefined =
          PropertyTypeController.generatePropertyTypeFromData(data[propertyName]);
        return new PropertyConfiguration({
          propertyName: propertyName,
          propertyType: propertyType || 'string',
          isArray: Array.isArray(data[propertyName]),
          hidden: propertyType == undefined,
          editable: editable,
        });
      });
  }

  /**
   * Searches for a `PropertyConfiguration` with `isPrimaryKey == true`.
   * The first matching property configuration is returned, expecting that
   * there is not more than one such property.
   * Hidden properties are searched, too, because the primary key does not need to be visible.
   * @param properties The array of `PropertyConfiguration`s to search the primary key in.
   * @returns The primary key `PropertyConfiguration` or `undefined` if there is no such property.
   */
  export function getPrimaryKeyProperty(properties: PropertyConfiguration[]): PropertyConfiguration | undefined {
    if (!properties?.length) return undefined;

    // Search for a primary key property
    for (const property of properties) {
      // Is this the primary key property?
      if (property?.isPrimaryKey) return property;

      // Search inside groups
      if (property.hasGroup) {
        const primaryKey = getPrimaryKeyProperty(property.flatGroup);
        if (primaryKey) return primaryKey;
      }
    }

    return undefined;
  }

}
