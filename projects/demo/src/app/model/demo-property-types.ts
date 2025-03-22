import { PEGlobalFunctions, PropertyConfiguration, PropertyType, PropertyTypeOptions } from 'ngx-property-editor';

/**
 * Returns an array of three demo property values for the given `propertyType`.
 * @param propertyType A property type.
 */
export function getDemoPropertyTypeValues(propertyType: PropertyType): any[] {
  switch (propertyType) {
    case 'boolean' :
      return [true, false, true];
    case 'boolean-indeterminate':
      return [true, false, undefined];
    case 'date':
    case 'datetime':
    case 'time':
    case 'month':
      return [
        new Date(2000, 0, 1, 0, 0, 0),
        new Date(2020, 1, 10, 10, 1, 0),
        new Date(2023, 11, 9, 19, 30, 0),
      ];
    case 'year':
      return [2000, 2020, 2023];
    case 'number':
      return [42, -11, 3.141592653];
    case 'string':
      return ['A simple text', 'Another text', 'And a third text'];
    case 'id':
      return [
        PEGlobalFunctions.generateRandomId(),
        PEGlobalFunctions.generateRandomId(),
        PEGlobalFunctions.generateRandomId(),
      ];
    case 'string-multiline':
      return [
        'A simple text\nwith\nmultiple lines',
        'Another text\nwith a linebreak, too',
        'And a third text without linebreak',
      ];
    case 'password':
      return ['1234', '5678', 'not very safe passwords'];
    case 'tel':
      return ['0123456789', '+49 123 11111111', '01112222222'];
    case 'email':
      return ['test@domain.com', 'test@domain.de', 'test@domain.net'];
    case 'url':
      return ['http://www.google.de', 'http://www.github.com', 'http://www.wikipedia.de'];
    case 'language':
      return ['de', 'en', 'da'];
    case 'country':
      return ['de', 'us', 'dk'];
    case 'color':
      return ['#41f0d5', '#251cc9', '#de1677'];
    case 'color-class':
      return ['danger', 'success', 'warning'];
    case 'icon':
      return ['pen', 'house', 'user'];
    case 'rating':
      return [5, 1, 3];
    case 'difficulty':
      return [1, 2, 3, 4, 5];
    case 'select':
      return ['1', '2', '3'];
    case 'button':
      return [undefined, undefined, undefined];
  }
}

const demoPropertyConfigurationDataSource: { value: string, name: string }[] = [
  { value: '1', name: 'First Item' },
  { value: '2', name: 'Second Item' },
  { value: '3', name: 'Third Item' },
  { value: '4', name: 'Fourth Item' },
  { value: '5', name: 'Fifth Item' },
];

/**
 * Returns a data source with demo values for all property types.
 */
export const demoPropertyTypesDataSource: {
  propertyType: PropertyType,
  values: any[],
  configurationSingleValues: PropertyConfiguration,
  configurationArrayValues: PropertyConfiguration,
}[] = PropertyTypeOptions.map(propertyType => ({
  propertyType: propertyType,
  values: getDemoPropertyTypeValues(propertyType),
  configurationSingleValues: new PropertyConfiguration({
    propertyName: propertyType,
    label: propertyType,
    propertyType: propertyType,
    isArray: false,
    editable: true,
    dataSource: demoPropertyConfigurationDataSource,
    valuePropertyName: 'value',
    displayPropertyName: 'name',
    routerLink: 'https://www.google.de',
    routerLinkIsExternal: true,
  }),
  configurationArrayValues: new PropertyConfiguration({
    propertyName: propertyType,
    label: propertyType,
    propertyType: propertyType,
    isArray: true,
    editable: true,
    dataSource: demoPropertyConfigurationDataSource,
    valuePropertyName: 'value',
    displayPropertyName: 'name',
    routerLink: 'https://www.google.de',
    routerLinkIsExternal: true,
  }),
}));
