import { PropertyType, PropertyValueDataType } from '../property-type';

export namespace PropertyTypeController {

  /**
   * Returns the property value data type of properties with the given property type.
   * Different `PropertyType`s share the same `PropertyValueDataType`
   * but use different visualizations.
   * There are some property types ('select' and 'button') which cannot be mapped to
   * a fixed property value data type. Thus, they return undefined.
   * @param propertyType A property type.
   * @returns A property value data type.
   */
  export function getPropertyValueDataType(propertyType: PropertyType): PropertyValueDataType | undefined {
    switch (propertyType) {
      case 'boolean':
      case 'boolean-indeterminate':
        return 'boolean';

      case 'date':
      case 'datetime':
      case 'time':
      case 'month':
        return 'date';

      case 'number':
      case 'rating':
      case 'difficulty':
      case 'year':
        return 'number';

      case 'string':
      case 'id':
      case 'string-multiline':
      case 'password':
      case 'tel':
      case 'email':
      case 'url':
      case 'language':
      case 'country':
      case 'color':
      case 'color-class':
      case 'icon':
        return 'string';

      case 'select':
      case 'button':
        return undefined;
    }
  }

  /**
   * Returns true, if the given property type requires boolean values.
   * @param propertyType A property type.
   */
  export function propertyTypeIsBoolean(propertyType: PropertyType): boolean {
    return getPropertyValueDataType(propertyType) == 'boolean';
  }

  /**
   * Returns true, if the given property type requires date values.
   * @param propertyType A property type.
   */
  export function propertyTypeIsDate(propertyType: PropertyType): boolean {
    return getPropertyValueDataType(propertyType) == 'date';
  }

  /**
   * Returns true, if the given property type requires numeric values.
   * @param propertyType A property type.
   */
  export function propertyTypeIsNumber(propertyType: PropertyType): boolean {
    return getPropertyValueDataType(propertyType) == 'number';
  }

  /**
   * Returns true, if the given property type requires string values.
   * @param propertyType A property type.
   */
  export function propertyTypeIsString(propertyType: PropertyType): boolean {
    return getPropertyValueDataType(propertyType) == 'string';
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

}
