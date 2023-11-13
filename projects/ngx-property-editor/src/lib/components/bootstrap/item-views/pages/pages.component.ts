import { Component, Input } from '@angular/core';
import { ItemViewBaseComponent } from "../item-view-base.component";
import { faAngleLeft, faAngleRight, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ItemDefinition } from "../item-view-item-base.component";

@Component({
  selector: 'pe-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent extends ItemViewBaseComponent {

  /**
   * Choose where to display the control buttons for moving to the previous or next page:
   * - 'top' (default):             Show controls above content.
   * - 'bottom':                    Show controls below content.
   * - 'label-top-controls-bottom': Show the label of the current item (see `showCurrentItemLabel`) above the content
   *                                and show the controls below the content.
   */
  @Input() public controlsPosition: 'top' | 'bottom' | 'label-top-controls-bottom' = 'top';

  /**
   * Choose whether to show the label of the currently displayed item between the control buttons:
   * - 'hide':              Don't show the label.
   * - 'show' (default):    Show the label of the current item.
   * - 'show-custom-label': Show a custom label inserted as `<span custom-label>...</span>`.
   */
  @Input() public showCurrentItemLabel: 'hide' | 'show' | 'show-custom-label' = 'show';
  /**
   * Alignment of the label of the currently displayed item (if displayed).
   * @see showCurrentItemLabel
   */
  @Input() public alignCurrentItemLabel: 'start' | 'center' | 'end' = 'start';

  @Input() public override disableSaveLastActiveItem: boolean = true;

  protected readonly iconPrevious: IconDefinition = faAngleLeft;
  protected readonly iconNext: IconDefinition = faAngleRight;

  /**
   * Index of the currently displayed item.
   */
  protected currentItemIndex: number = 0;

  /**
   * Currently displayed item.
   */
  protected currentItem: ItemDefinition | undefined = undefined;

  public constructor() {
    super();
  }

  public override updateItems() {
    super.updateItems();
    // Update the currently displayed item when the items array has changed
    this.setCurrentItem(this.currentItemIndex)

  }

  protected override updateDefaultItemIndex() {
    super.updateDefaultItemIndex();
    // Assign default item index as current index when the default item index has changed
    this.setCurrentItem(this._defaultItemIndex)
  }

  /**
   * Changes the currently displayed item.
   * @param index Index of an item. If the index is outside the valid range, it is mapped to [0, _items.length - 1].
   */
  protected setCurrentItem(index: number): void {
    if (index < 0) index = 0;
    if (index > this._items.length - 1) index = this._items.length - 1;

    this.currentItemIndex = index;
    this.currentItem = this._items[index];
  }

  /**
   * Returns true, if the previous page button should be displayed (if a previous item exists).
   */
  protected get showPreviousButton(): boolean {
    return this.currentItemIndex > 0;
  }

  /**
   * Returns true, if the next page button should be displayed (if a next item exists).
   */
  protected get showNextButton(): boolean {
    return this.currentItemIndex < this._items.length - 1;
  }

  /**
   * This function is called when the previous page button was clicked.
   * It changes the currently displayed item to the previous one.
   */
  protected onPreviousButtonClicked(): void {
    if (this.currentItemIndex <= 0) return;
    this.setCurrentItem(this.currentItemIndex - 1);
  }

  /**
   * This function is called when the next page button was clicked.
   * It changes the currently displayed item to the next one.
   */
  protected onNextButtonClicked(): void {
    if (this.currentItemIndex >= this._items.length - 1) return;
    this.setCurrentItem(this.currentItemIndex + 1);
  }

}
