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

  it('createDateUTC', () => {
    let date: Date | undefined = PEGlobalFunctions.createDateUTC(2024, 3, 24, 13, 54, 7, 100);
    expect(date).toBeDefined();
    expect(date?.toISOString()).toEqual('2024-04-24T13:54:07.100Z');
    
    date = PEGlobalFunctions.createDateUTC(2024, 3, 22, 10, 1, 2);
    expect(date).toBeDefined();
    expect(date?.toISOString()).toEqual('2024-04-22T10:01:02.000Z');

    date = PEGlobalFunctions.createDateUTC(2024);
    expect(date).toBeDefined();
    expect(date?.toISOString()).toEqual('2024-01-01T00:00:00.000Z');
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
