/**
 * Item value type for the `HierarchyInputComponent`.
 * @typeparam T Type of the `object` linked to the item.
 */
export type HierarchyItem<T = any> = {

  /** Human-readable name displayed on the hierarchy item element. */
  name: string,

  /** Ordering index of the item. */
  order: number,

  /** Nested child items. */
  children: HierarchyItem[],

  /** Optional reference to the parent item. */
  parent?: HierarchyItem | undefined,

  /** Any object that might be linked to the item. */
  object?: T,

}

/**
 * Value type for the `HierarchyInputComponent`.
 * @typeparam T Type of the `object` linked to an `HiererchyItem`.
 */
export type Hierarchy<T = any> = HierarchyItem<T>[];


export namespace HierarchyController {


  /**
   * Builds a `Hierarchy` array from the given array of objects with an ordering and a parent object property.
   * @typeparam TEntry Type of the objects in the `entries` array.
   * @param entries Array of objects.
   * @param getEntryNameFunction A function that returns receives one of the objects
   *                             and returns a human-readable name of the object.
   * @param getEntryOrderFunction A function that returns receives one of the objects
   *                              and returns the ordering property of the object.
   *                              The hierarchy items are ordered by this property ascendingly.
   * @param getEntryParentFunction A function that returns receives one of the objects
   *                              and returns the optional parent object of the given object.
   */
  export function buildHierarchyFromObjectsWithOrder<TEntry = any>(entries: TEntry[],
                                                                   getEntryNameFunction: (entry: TEntry) => string,
                                                                   getEntryOrderFunction: (entry: TEntry) => number,
                                                                   getEntryParentFunction: (entry: TEntry) => TEntry | undefined): Hierarchy<TEntry> {
    const hierarchy: Hierarchy<TEntry> = [];

    if (!entries?.length) {
      return hierarchy;
    }

    const itemsWithMissingParent: { item: HierarchyItem<TEntry>, parent: TEntry }[] = [];

    function findValueItem(entry: TEntry, items: HierarchyItem<TEntry>[] | undefined = undefined): HierarchyItem | undefined {
      if (items == undefined) items = hierarchy;
      if (!items?.length) return undefined;

      for (const item of items) {
        if (item.object == entry)
          return item;

        if (item.children?.length) {
          const foundInChildren = findValueItem(entry, item.children);
          if (foundInChildren)
            return foundInChildren;
        }
      }

      return undefined;
    }

    // Iterate over all entries
    for (const entry of entries) {
      if (!entry) continue;

      const item: HierarchyItem = {
        name: getEntryNameFunction ? getEntryNameFunction(entry) : entry?.toString() ?? '',
        order: getEntryOrderFunction ? getEntryOrderFunction(entry) ?? 0 : 0,
        children: [],
        parent: undefined,
        object: entry,
      };

      if (getEntryParentFunction) {
        const parent: TEntry | undefined = getEntryParentFunction(entry);
        if (parent) {
          const parentItem = findValueItem(parent);
          if (parentItem) {
            item.parent = parentItem;
            parentItem.children.push(item);
          } else {
            hierarchy.push(item);
            itemsWithMissingParent.push({item: item, parent: parent});
          }

        } else {
          hierarchy.push(item);
        }
      }
    }

    // Iterate over entries could not have been linked to parent entries yet
    for (const obj of itemsWithMissingParent) {
      const parentItem = findValueItem(obj.parent);
      if (parentItem) {
        // Search for circular relationships!!!
        let foundCircle: boolean = false;
        let checkItem: HierarchyItem<TEntry> | undefined = parentItem;
        while (checkItem) {
          if (checkItem == obj.item) {
            foundCircle = true;
            break;
          }
          checkItem = checkItem.parent;
        }

        if (!foundCircle) {
          obj.item.parent = parentItem;
          parentItem.children.push(obj.item);
          const index: number = hierarchy.indexOf(obj.item);
          if (index >= 0)
            hierarchy.splice(index, 1);
        }
      }
    }

    sortHierarchyItems(hierarchy);
    assignNewOrderToHierarchyItems(hierarchy);

    return hierarchy;
  }

  /**
   * Builds an array of objects from the given `Hierarchy` array and updates the ordering and parent object properties.
   * This is the reverse operation of `buildHierarchyFromObjectsWithOrder()`.
   * @param hierarchy
   * @param setEntryOrderFunction
   * @param setEntryParentFunction
   */
  export function getObjectsWithOrderFromHierarchy<TEntry = any>(hierarchy: Hierarchy<TEntry>,
                                                                 setEntryOrderFunction: (entry: TEntry, order: number) => void,
                                                                 setEntryParentFunction: (entry: TEntry, parentEntry: TEntry | undefined) => void): TEntry[] {
    const entries: TEntry[] = [];

    function process(items: HierarchyItem<TEntry>[]): void {
      for (const item of items) {
        if (!item?.object) continue;
        const entry = item.object;

        // Assign new ordering property
        if (setEntryOrderFunction) {
          setEntryOrderFunction(entry, item.order);
        }

        // Assign new parent entry
        if (setEntryParentFunction) {
          setEntryParentFunction(entry, item?.parent?.object);
        }

        entries.push(entry);
      }
    }

    process(hierarchy ?? []);

    return entries;
  }

  /**
   * Sorts the given array of hierarchy items by the `HierarchyItem.order` property.
   * @param hierarchy Array of hierarchy items.
   */
  export function sortHierarchyItems<T = any>(hierarchy: HierarchyItem<T>[]): void {
    if (!hierarchy?.length) return;

    hierarchy.sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));

    // Sort nested items
    for (const item of hierarchy) {
      if (item?.children?.length) {
        sortHierarchyItems<T>(item.children);
      }
    }
  }

  /**
   * Assigns new ordering indices to the given array of hierarchy items
   * based on their position in the array.
   * @param hierarchy Array of hierarchy items.
   */
  export function assignNewOrderToHierarchyItems<T = any>(hierarchy: HierarchyItem<T>[]): void {
    function innerFunction(items: HierarchyItem<T>[], lastOrderIndex: number = 0): number {
      if (!items?.length) return lastOrderIndex;

      for (const item of items) {
        lastOrderIndex += 1;
        item.order = lastOrderIndex;

        // Iterate over nested items
        if (item?.children?.length) {
          lastOrderIndex = innerFunction(item.children, lastOrderIndex);
        }
      }

      return lastOrderIndex;
    }

    innerFunction(hierarchy);
  }

}
