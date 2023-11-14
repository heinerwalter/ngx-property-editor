import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ItemDefinition, ItemViewItemBaseComponent } from './item-view-item-base.component';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';

@Component({
  template: '',
})
export abstract class ItemViewBaseComponent implements OnInit, OnChanges {

  /**
   * You must define different IDs, if there are more than one instance
   * of this type of item view component on the same page.
   */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

  /** Displayed items generated by `updateItems()` from the `registeredItemComponents`. */
  protected _items: ItemDefinition[] = [];

  /**
   * `ItemViewItemBaseComponent` implementations which can be put into the template content of an
   * `ItemViewBaseComponent` implementation.
   * @see registerItemComponent
   * @see unregisterItemComponent
   * @see updateItems
   */
  protected readonly registeredItemComponents: ItemViewItemBaseComponent[] = [];

  /**
   * If defined the item with the given label is initially selected.
   * Otherwise, the first item is initially selected.
   */
  @Input() public defaultItemLabel: string | undefined = undefined;

  /**
   * If defined the item with the given index is initially selected.
   * Otherwise, the first item is initially selected.
   * This property is only considered, if `defaultItemLabel` is not defined.
   */
  @Input() public defaultItemIndex: number | undefined = undefined;

  /**
   * Item index computed by `updateDefaultItemIndex()` using
   * the `defaultItemLabel` and the `_items` configuration or `defaultItemIndex`.
   */
  protected _defaultItemIndex: number = 0;

  /** Index of the currently viewed item. */
  protected currentItemIndex: number = 0;
  /** Currently viewed item. */
  protected currentItem: ItemDefinition | undefined = undefined;

  public ngOnInit(): void {
    this.updateDefaultItemIndex();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('defaultItemLabel') ||
      changes.hasOwnProperty('defaultItemIndex')) {
      this.updateDefaultItemIndex();
    }
  }

  /**
   * Called by implementations of `ItemViewItemBaseComponent` to register a new item component
   * @param itemComponentRef A reference to the item component.
   */
  public registerItemComponent(itemComponentRef: ItemViewItemBaseComponent): void {
    this.registeredItemComponents.push(itemComponentRef);
    this.updateItems();
  }

  /**
   * Called by implementations of `ItemViewItemBaseComponent` to unregister a destroyed item component
   * @param itemComponentRef A reference to the item component.
   */
  public unregisterItemComponent(itemComponentRef: ItemViewItemBaseComponent): void {
    const index: number = this.registeredItemComponents.indexOf(itemComponentRef);
    if (index < 0) return;
    this.registeredItemComponents.splice(index, 1);
    this.updateItems();
  }

  /**
   * Updates the `_items` array from `registeredItemComponents`.
   * This function is necessary for the item `order` property to take effect.
   * This function must be called when one of the following events occurred:
   * - an item component was registered or unregistered (`registeredItemComponents` changed)
   * - a property of one of the registered item components changed (called by `ItemViewItemBaseComponent.ngOnChanges`).
   */
  public updateItems(): void {
    setTimeout(() => {
      const items: ItemDefinition[] = [...this.registeredItemComponents];

      items.sort((a, b) => {
        if (a?.order == undefined || b?.order == undefined) {
          if (a?.order == undefined && b?.order != undefined) return -1;
          if (a?.order != undefined && b?.order == undefined) return 1;
          return 0;
        }
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      });

      this._items = items;
      this.updateDefaultItemIndex();
    }, 0);
  }

  /**
   * Updates the `_defaultItemIndex` based on `defaultItemIndex` or
   * `defaultItemLabel` and the `_items` configuration.
   */
  protected updateDefaultItemIndex(defaultLabel: string | undefined = undefined): void {
    if (!defaultLabel)
      defaultLabel = this.defaultItemLabel;

    let index: number = 0;
    if (this._items.length) {
      if (defaultLabel) {
        index = this._items.findIndex(item => item.label == defaultLabel);
      }
      if (!defaultLabel || index < 0) {
        index = this.defaultItemIndex || 0;
      }
      if (index < 0) index = 0;
      if (index > this._items.length - 1)
        index = this._items.length - 1;
    }

    this._defaultItemIndex = index;
    this.onItemChanged(this._items[index], index);
  }

  /**
   * This function is called when the user clicked on a control to change the currently viewed item.
   * @param item The newly viewed item.
   * @param itemIndex Index of the newly viewed item.
   */
  protected onItemChanged(item: ItemDefinition, itemIndex: number): void {
    if (!item) return;
    if (item.routerLink) return;

    this.currentItem = item;
    this.currentItemIndex = itemIndex;
  }

}
