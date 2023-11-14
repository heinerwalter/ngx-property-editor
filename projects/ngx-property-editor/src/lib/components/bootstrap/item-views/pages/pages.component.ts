import { Component, Input } from '@angular/core';
import { ItemViewBaseComponent } from '../item-view-base.component';
import { faAngleLeft, faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

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
   * Choose how the control buttons should look like:
   * - 'buttons': Normal Bootstrap button style (rounded) and a gap between controls and content.
   * - 'box':     Buttons without round corners and without gap between controls and content.
   *              A border is added around the whole controls area, too.
   */
  @Input() public controlsStyle: 'buttons' | 'box' = 'buttons';

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

  protected readonly iconPrevious: IconDefinition = faAngleLeft;
  protected readonly iconNext: IconDefinition = faAngleRight;

  public constructor() {
    super();
  }

  public override updateItems() {
    super.updateItems();
    // Update the currently displayed item when the items array has changed
    this.setCurrentItem(this.currentItemIndex);
  }

  /**
   * Changes the currently displayed item.
   * @param index Index of an item. If the index is outside the valid range, it is mapped to [0, _items.length - 1].
   */
  protected setCurrentItem(index: number): void {
    if (index < 0) index = 0;
    if (index > this._items.length - 1) index = this._items.length - 1;

    this.onItemChanged(this._items[index], index);
  }

  /**
   * If true, the previous page button is displayed (if a previous item exists).
   */
  protected get showPreviousButton(): boolean {
    return this.currentItemIndex > 0;
  }

  /**
   * If true, the next page button is displayed (if a next item exists).
   */
  protected get showNextButton(): boolean {
    return this.currentItemIndex < this._items.length - 1;
  }

  /**
   * If true, the previous page button is disabled and thus the user cannot navigate to the previous page.
   */
  protected get disablePreviousButton(): boolean {
    if (!this.showPreviousButton) return false;
    return this._items[this.currentItemIndex - 1]?.hidden || false;
  }

  /**
   * If true, the next page button is disabled and thus the user cannot navigate to the next page.
   */
  protected get disableNextButton(): boolean {
    if (!this.showNextButton) return false;
    return this._items[this.currentItemIndex + 1]?.hidden || false;
  }

  /**
   * Go to the previous page if possible.
   */
  public gotoPreviousPage(): void {
    if (!this.showPreviousButton || this.disablePreviousButton) return;
    this.setCurrentItem(this.currentItemIndex - 1);
  }

  /**
   * Go to the next page if possible.
   */
  public gotoNextPage(): void {
    if (!this.showNextButton || this.disableNextButton) return;
    this.setCurrentItem(this.currentItemIndex + 1);
  }

}
