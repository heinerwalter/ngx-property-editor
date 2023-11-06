import { PEGlobalFunctions } from './pe-global-functions';

describe('PEGlobalFunctions', () => {

  it('generateRandomId', () => {
    expect(PEGlobalFunctions.generateRandomId())
      .toBeTruthy();
  });

  it('different generateRandomIds', () => {
    expect(PEGlobalFunctions.generateRandomId() != PEGlobalFunctions.generateRandomId())
      .toBeTruthy();
  });

  const dataSource = [
    { name: 'Item 1', value: 1 },
    { name: 'Item 2', value: 2 },
    { name: 'Item 3', value: 3 },
    { name: 'Item 4', value: 4 },
    { name: 'Item 5', value: 5 },
  ];

  it('evaluateValuePropertyName', () => {
    expect(PEGlobalFunctions.evaluateValuePropertyName('value', dataSource[1]))
      .toEqual(2);
  });

  it('evaluateValuePropertyName undefined', () => {
    expect(PEGlobalFunctions.evaluateValuePropertyName(undefined, dataSource[1]))
      .toEqual({ name: 'Item 2', value: 2 });
  });

  it('evaluateDisplayPropertyName', () => {
    expect(PEGlobalFunctions.evaluateDisplayPropertyName('name', dataSource[1]))
      .toEqual('Item 2');
  });

  it('evaluateDisplayPropertyName undefined', () => {
    expect(PEGlobalFunctions.evaluateDisplayPropertyName(undefined, dataSource[1]))
      .toEqual('[object Object]');
  });

  it('getDataSourceItem', () => {
    expect(PEGlobalFunctions.getDataSourceItem(dataSource, 'value', 3))
      .toEqual({ name: 'Item 3', value: 3 });
  });

  it('getDataSourceItem invalid', () => {
    expect(PEGlobalFunctions.getDataSourceItem(dataSource, 'value', 100))
      .toBeUndefined();
  });
});
