import { Component, Input } from '@angular/core';
import { ItemDefinition } from './item-view-item-base.component';
import { ItemViewBaseComponent } from './item-view-base.component';

@Component({
  template: '',
})
export abstract class ItemViewWithStateSaveBaseComponent extends ItemViewBaseComponent {

  /**
   * By default, the last active item is saved in the `localStorage`
   * and reactivated at the next page load (requires `id`).
   * If this property is set to true, the last active item is not saved
   */
  @Input() public disableSaveLastActiveItem: boolean = false;

  private readonly localStorageDefaultItemLabelKeyPrefix: string = 'item-view-default-item-';

  /**
   * Updates the `_defaultItemIndex` based on `defaultItemIndex` or
   * `defaultItemLabel` and the `_items` configuration.
   *
   * If the last active item has been saved (if `disableSaveLastActiveItem == false`),
   * that item is used instead of `defaultItemIndex` or `defaultItemLabel`.
   */
  protected override updateDefaultItemIndex(defaultLabel: string | undefined = undefined): void {
    if (!defaultLabel && !this.disableSaveLastActiveItem && this.id)
      defaultLabel = localStorage.getItem(this.localStorageDefaultItemLabelKeyPrefix + this.id) || undefined;
    super.updateDefaultItemIndex(defaultLabel);
  }

  protected override onItemChanged(item: ItemDefinition, itemIndex: number): void {
    super.onItemChanged(item, itemIndex);

    if (!this.disableSaveLastActiveItem && this.id && item?.label && !item.routerLink) {
      localStorage.setItem(this.localStorageDefaultItemLabelKeyPrefix + this.id, item.label);
    }
  }

}
