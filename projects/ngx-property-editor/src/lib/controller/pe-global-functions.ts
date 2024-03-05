export module PEGlobalFunctions {

  /**
   * Generates a new random ID for components which don't have an assigned ID.
   */
  export function generateRandomId(): string {
    const length: number = 20;
    let result: string = '';
    const characters: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * Evaluates a `valuePropertyName` on the given data source `item`.
   * @param valuePropertyName Evaluate this property name on the given data source item to get its value.
   *                          If undefined, the whole data source item is used as value.
   * @param item An item of a data source.
   */
  export function evaluateValuePropertyName(valuePropertyName: string | undefined,
                                            item: any | undefined): any {
    if (!item || !valuePropertyName) return item;
    return item[valuePropertyName];
  }

  /**
   * Evaluates a `displayPropertyName` on the given data source `item`.
   * @param displayPropertyName Evaluate this property name on the given data source item to get its display text.
   *                            If undefined, the whole data source item is used as display text.
   * @param item An item of a data source.
   */
  export function evaluateDisplayPropertyName(displayPropertyName: string | undefined,
                                              item: any | undefined): string {
    if (!item) return '';
    if (!displayPropertyName) return item.toString();
    return item[displayPropertyName]?.toString() || '';
  }

  /**
   * Returns the item of a data source with the given value.
   * @param dataSource A data source.
   * @param valuePropertyName Evaluate this property name on the data source items to get their values.
   *                          If undefined, the whole data source item is used as value.
   * @param value Search for a data source item with this value
   * @returns The first data source item matching the given value or undefined, if no such item exists.
   */
  export function getDataSourceItem(dataSource: any[],
                                    valuePropertyName: string | undefined,
                                    value: any): any | undefined {
    if (!dataSource) return undefined;
    return dataSource.find(item => evaluateValuePropertyName(valuePropertyName, item) == value);
  }

}
