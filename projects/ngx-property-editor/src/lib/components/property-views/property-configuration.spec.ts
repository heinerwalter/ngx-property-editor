import { PropertyConfiguration, PropertyConfigurationConstructorParameter } from './property-configuration';
import { PropertyEditorMode } from './property-editor-mode';

const modes: PropertyEditorMode[] = [
  'view',
  'table',
  'edit',
];

const configuration1: PropertyConfigurationConstructorParameter = {
  propertyName: 'topics',
  label: (data, mode) => mode + ' topics',
  propertyType: 'select',
  valueFunction: undefined,
  setValueFunction: undefined,
  dataSource: () => [
    { value: 'apple', name: 'Apple' },
    { value: 'banana', name: 'Banana' },
    { value: 'cherry', name: 'Cherry' },
  ],
  valuePropertyName: 'value',
  displayPropertyName: 'name',
  hidden: (data) => !!data?.topics?.includes('dog'),
  hideIfEmpty: true,
  editable: true,
  required: true,
  routerLink: 'topics',
  routerLinkIsExternal: false,
  routerLinkTooltip: 'Go to topics',
  md: 6,
  separator: false,
  isArray: true,
  newArrayItemFunction: () => '',
  inputGroup: undefined,
};

function getDataObject1() {
  return {
    name: 'fruit',
    topics: ['banana', 'apple'],
  };
}

function expectAllUndefined(propertyConfiguration: PropertyConfiguration): void {
  expect(propertyConfiguration.propertyName).toBeUndefined();
  expect(propertyConfiguration.label).toBeUndefined();
  expect(propertyConfiguration.propertyType).toBeUndefined();
  expect(propertyConfiguration.valueFunction).toBeUndefined();
  expect(propertyConfiguration.setValueFunction).toBeUndefined();
  expect(propertyConfiguration.dataSource).toBeUndefined();
  expect(propertyConfiguration.valuePropertyName).toBeUndefined();
  expect(propertyConfiguration.displayPropertyName).toBeUndefined();
  expect(propertyConfiguration.hidden).toBeUndefined();
  expect(propertyConfiguration.hideIfEmpty).toBeFalse();
  expect(propertyConfiguration.editable).toBeUndefined();
  expect(propertyConfiguration.required).toBeUndefined();
  expect(propertyConfiguration.routerLink).toBeUndefined();
  expect(propertyConfiguration.routerLinkIsExternal).toBeUndefined();
  expect(propertyConfiguration.routerLinkTooltip).toBeUndefined();
  expect(propertyConfiguration.md).toBeUndefined();
  expect(propertyConfiguration.separator).toBeFalse();
  expect(propertyConfiguration.isArray).toBeFalse();
  expect(propertyConfiguration.newArrayItemFunction).toBeUndefined();
  expect(propertyConfiguration.inputGroup).toBeUndefined();
}

function expectConfiguration(propertyConfiguration: PropertyConfiguration, parameter: PropertyConfigurationConstructorParameter): void {
  expect(typeof propertyConfiguration.propertyName).toEqual(typeof parameter.propertyName);
  expect(typeof propertyConfiguration.label).toEqual(typeof parameter.label);
  expect(typeof propertyConfiguration.propertyType).toEqual(typeof parameter.propertyType);
  expect(typeof propertyConfiguration.valueFunction).toEqual(typeof parameter.valueFunction);
  expect(typeof propertyConfiguration.setValueFunction).toEqual(typeof parameter.setValueFunction);
  expect(typeof propertyConfiguration.dataSource).toEqual(typeof parameter.dataSource);
  expect(typeof propertyConfiguration.valuePropertyName).toEqual(typeof parameter.valuePropertyName);
  expect(typeof propertyConfiguration.displayPropertyName).toEqual(typeof parameter.displayPropertyName);
  expect(typeof propertyConfiguration.hidden).toEqual(typeof parameter.hidden);
  expect(typeof propertyConfiguration.hideIfEmpty).toEqual(typeof parameter.hideIfEmpty);
  expect(typeof propertyConfiguration.editable).toEqual(typeof parameter.editable);
  expect(typeof propertyConfiguration.required).toEqual(typeof parameter.required);
  expect(typeof propertyConfiguration.routerLink).toEqual(typeof parameter.routerLink);
  expect(typeof propertyConfiguration.routerLinkIsExternal).toEqual(typeof parameter.routerLinkIsExternal);
  expect(typeof propertyConfiguration.routerLinkTooltip).toEqual(typeof parameter.routerLinkTooltip);
  expect(typeof propertyConfiguration.md).toEqual(typeof parameter.md);
  expect(typeof propertyConfiguration.separator).toEqual(typeof parameter.separator);
  expect(typeof propertyConfiguration.isArray).toEqual(typeof parameter.isArray);
  expect(typeof propertyConfiguration.newArrayItemFunction).toEqual(typeof parameter.newArrayItemFunction);
  expect(typeof propertyConfiguration.inputGroup).toEqual(typeof parameter.inputGroup);

  if (typeof parameter.propertyName !== 'function')
    expect(propertyConfiguration.propertyName).toEqual(parameter.propertyName);
  if (typeof parameter.label !== 'function')
    expect(propertyConfiguration.label).toEqual(parameter.label);
  if (typeof parameter.propertyType !== 'function')
    expect(propertyConfiguration.propertyType).toEqual(parameter.propertyType);
  if (typeof parameter.valueFunction !== 'function')
    expect(propertyConfiguration.valueFunction).toEqual(parameter.valueFunction);
  if (typeof parameter.setValueFunction !== 'function')
    expect(propertyConfiguration.setValueFunction).toEqual(parameter.setValueFunction);
  if (typeof parameter.dataSource !== 'function')
    expect(propertyConfiguration.dataSource).toEqual(parameter.dataSource);
  if (typeof parameter.valuePropertyName !== 'function')
    expect(propertyConfiguration.valuePropertyName).toEqual(parameter.valuePropertyName);
  if (typeof parameter.displayPropertyName !== 'function')
    expect(propertyConfiguration.displayPropertyName).toEqual(parameter.displayPropertyName);
  if (typeof parameter.hidden !== 'function')
    expect(propertyConfiguration.hidden).toEqual(parameter.hidden);
  if (typeof parameter.hideIfEmpty !== 'function')
    expect(propertyConfiguration.hideIfEmpty).toEqual(!!parameter.hideIfEmpty);
  if (typeof parameter.editable !== 'function')
    expect(propertyConfiguration.editable).toEqual(parameter.editable);
  if (typeof parameter.required !== 'function')
    expect(propertyConfiguration.required).toEqual(parameter.required);
  if (typeof parameter.routerLink !== 'function')
    expect(propertyConfiguration.routerLink).toEqual(parameter.routerLink);
  if (typeof parameter.routerLinkIsExternal !== 'function')
    expect(propertyConfiguration.routerLinkIsExternal).toEqual(parameter.routerLinkIsExternal);
  if (typeof parameter.routerLinkTooltip !== 'function')
    expect(propertyConfiguration.routerLinkTooltip).toEqual(parameter.routerLinkTooltip);
  if (typeof parameter.md !== 'function')
    expect(propertyConfiguration.md).toEqual(parameter.md);
  if (typeof parameter.separator !== 'function')
    expect(propertyConfiguration.separator).toEqual(!!parameter.separator);
  if (typeof parameter.isArray !== 'function')
    expect(propertyConfiguration.isArray).toEqual(!!parameter.isArray);
  if (typeof parameter.newArrayItemFunction !== 'function')
    expect(propertyConfiguration.newArrayItemFunction).toEqual(parameter.newArrayItemFunction);
  if (typeof parameter.inputGroup !== 'function')
    expect(propertyConfiguration.inputGroup).toEqual(parameter.inputGroup);
}

describe('PropertyConfiguration', () => {

  it('empty constructor', () => {
    const obj = new PropertyConfiguration();
    expectAllUndefined(obj);
  });

  it('constructor with configuration all undefined', () => {
    const obj = new PropertyConfiguration({
      propertyName: undefined,
      label: undefined,
      propertyType: undefined,
      valueFunction: undefined,
      setValueFunction: undefined,
      dataSource: undefined,
      valuePropertyName: undefined,
      displayPropertyName: undefined,
      hidden: undefined,
      hideIfEmpty: undefined,
      editable: undefined,
      required: undefined,
      routerLink: undefined,
      routerLinkIsExternal: undefined,
      routerLinkTooltip: undefined,
      md: undefined,
      separator: undefined,
      isArray: undefined,
      newArrayItemFunction: undefined,
      inputGroup: undefined,
    });
    expectAllUndefined(obj);
  });

  it('constructor with filled configuration', () => {
    const propertyConfiguration = new PropertyConfiguration(configuration1);
    expectConfiguration(propertyConfiguration, configuration1);
  });

  modes.forEach(mode => {
    const propertyConfiguration = new PropertyConfiguration(configuration1);
    const data = getDataObject1();

    it(`getLabel function (${mode})`, () => {
      expect(propertyConfiguration.getLabel(data, mode)).toEqual(mode + ' topics');
    });

    it(`getValue function (${mode})`, () => {
      const value = propertyConfiguration.getValue(data, mode) as string[];
      expect(Array.isArray(value)).toBeTrue();
      expect(value.length).toEqual(2);
      expect(value[0]).toEqual('banana');
      expect(value[1]).toEqual('apple');
    });

    it(`getDisplayValue function (${mode})`, () => {
      const value = propertyConfiguration.getDisplayValue(data, mode) as string[];
      expect(Array.isArray(value)).toBeTrue();
      expect(value.length).toEqual(2);
      expect(value[0]).toEqual('Banana');
      expect(value[1]).toEqual('Apple');
    });

    it(`getDataSource function (${mode})`, () => {
      const dataSource = propertyConfiguration.getDataSource(data, mode);
      expect(Array.isArray(dataSource)).toBeTrue();
      expect(dataSource.length).toEqual(3);
      expect(dataSource[0].value).toEqual('apple');
      expect(dataSource[0].name).toEqual('Apple');
    });

    it(`isHidden function (${mode})`, () => {
      expect(propertyConfiguration.isHidden(data, mode)).toEqual(false);
      expect(propertyConfiguration.isHidden({ topics: ['banana', 'dog'] }, mode)).toEqual(true);
      expect(propertyConfiguration.isHidden({}, mode)).toEqual(mode != 'edit');
      expect(propertyConfiguration.isHidden({ topics: [] }, mode)).toEqual(mode != 'edit');
    });

    it(`isEditable function (${mode})`, () => {
      expect(propertyConfiguration.isEditable(data, mode)).toBeTrue();
    });

    it(`isRequired function (${mode})`, () => {
      expect(propertyConfiguration.isRequired(data, mode)).toBeTrue();
    });

    it(`getRouterLink function (${mode})`, () => {
      expect(propertyConfiguration.getRouterLink(data, mode)).toEqual('topics');
    });

    it(`getRouterLinkIsExternal function (${mode})`, () => {
      expect(propertyConfiguration.getRouterLinkIsExternal(data, mode)).toBeFalse();
    });

    it(`getRouterLinkTooltip function (${mode})`, () => {
      expect(propertyConfiguration.getRouterLinkTooltip(data, mode)).toEqual('Go to topics');
    });

    it(`getBootstrapColumnMD function (${mode})`, () => {
      expect(propertyConfiguration.getBootstrapColumnMD(data, mode)).toEqual(6);
    });

    it(`getBootstrapColumnClass function (${mode})`, () => {
      expect(propertyConfiguration.getBootstrapColumnClass(data, mode)).toEqual('col-md-6');
    });

  });

  it('getArrayItemConfiguration function', () => {
    const propertyConfiguration = new PropertyConfiguration(configuration1);

    const onValueChange = (itemValue: any) => {
      throw 'value changed to ' + itemValue;
    };
    const itemConfiguration = propertyConfiguration.getArrayItemConfiguration(10, 'foo', onValueChange);

    expectConfiguration(itemConfiguration, {
      ...propertyConfiguration,
      isArray: false,
      propertyName: undefined,
      valueFunction: (data: any) => 'foo',
      setValueFunction: (data: any, newValue: any) => onValueChange(newValue),
    });
    expect(itemConfiguration.getValue(undefined, 'view')).toEqual('foo');
    expect(() => itemConfiguration.setValue(undefined, 'bar')).toThrow('value changed to bar');
  });

  it('setValue function', () => {
    const propertyConfiguration = new PropertyConfiguration({
      propertyName: 'type',
    });
    const data = {
      name: 'fruit',
      type: 'apple',
    };

    expect(propertyConfiguration.getValue(data, 'view')).toEqual('apple');
    propertyConfiguration.setValue(data, 'banana');
    expect(data.type).toEqual('banana');
    expect(propertyConfiguration.getValue(data, 'view')).toEqual('banana');
  });

});
