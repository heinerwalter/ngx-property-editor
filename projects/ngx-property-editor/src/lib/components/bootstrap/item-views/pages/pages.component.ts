import { ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { ItemViewBaseComponent } from '../item-view-base.component';
import { faAngleLeft, faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PagesComponent extends ItemViewBaseComponent {

  /**
   * Choose where to display the control buttons for moving to the previous or next page:
   * - 'top' (default):             Show controls above content.
   * - 'bottom':                    Show controls below content.
   * - 'bottom-fixed':              Show controls fixed at the window bottom.
   * - 'label-top-controls-bottom': Show the label of the current item (see `showCurrentItemLabel`) above the content
   *                                and show the controls below the content.
   */
  @Input() public controlsPosition: 'top' | 'bottom' | 'bottom-fixed' | 'label-top-controls-bottom' = 'top';

  /**
   * Choose how the control buttons should look like:
   * - 'buttons': Normal Bootstrap button style (rounded) and a gap between controls and content.
   * - 'box':     Buttons without round corners and without gap between controls and content.
   *              A border is added around the whole controls area, too.
   */
  @Input() public controlsStyle: 'buttons' | 'box' = 'buttons';

  /**
   * Choose a bootstrap button color for the control buttons.
   */
  @Input() public controlColor: 'primary' |
    'secondary' |
    'success' |
    'info' |
    'warning' |
    'danger' |
    'light' |
    'dark' = 'light';

  /**
   * Choose a bootstrap button variant ('solid' (normal color class; e.g. `.btn-primary`)
   * or 'outline' (e.g. `.btn-outline-primary`)) for the control buttons.
   */
  @Input() public controlColorVariant: 'solid' | 'outline' = 'solid';

  /**
   * Returns the bootstrap button color class created from `controlColor` and `controlColorVariant`
   * @returns A control button color class (e.g. `.pe-pages-control-primary`).
   */
  public get controlColorClass(): string {
    return 'pe-pages-control-' + (this.controlColorVariant == 'outline' ? 'outline-' : '') + this.controlColor;
  }

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

  /**
   * If true, no borders are displayed around controls or content.
   */
  @Input() public noBorder: boolean = false;

  protected readonly iconPrevious: IconDefinition = faAngleLeft;
  protected readonly iconNext: IconDefinition = faAngleRight;

  public constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  public override updateItems(): void {
    super.updateItems();
    // Update the currently displayed item when the items array has changed
    this.gotoPage(this.currentItemIndex, true);
  }

  /**
   * Changes the currently displayed page.
   * @param index Index of a page item. If the index is outside the valid range, it is mapped to [0, _items.length - 1].
   * @param ignoreHidden If true, this function does not pay attention to hidden page items.
   */
  public gotoPage(index: number, ignoreHidden: boolean = false): void {
    if (index < 0) index = 0;
    if (index > this._items.length - 1) index = this._items.length - 1;
	
	// Is destination page hidden? And should we care?
	if (!ignoreHidden && this.isPageHidden(index)) return;

    this.onItemChanged(this._items[index], index);
  }

/**
   * Go to the first page, if possible.
   * @param ignoreHidden If true, this function does not pay attention to hidden page items.
   */
  public gotoFirstPage(ignoreHidden: boolean = false): void {
    this.gotoPage(0, ignoreHidden);
  }
  
  /**
   * Go to the previous page, if possible.
   * @param ignoreHidden If true, this function does not pay attention to hidden page items.
   */
  public gotoPreviousPage(ignoreHidden: boolean = false): void {
    if (!this.showPreviousButton) return;
    this.gotoPage(this.currentItemIndex - 1, ignoreHidden);
  }

  /**
   * Go to the next page, if possible.
   * @param ignoreHidden If true, this function does not pay attention to hidden page items.
   */
  public gotoNextPage(ignoreHidden: boolean = false): void {
    if (!this.showNextButton) return;
    this.gotoPage(this.currentItemIndex + 1, ignoreHidden);
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
   * Returns false, if the queried page item is not hidden and it exists.
   * Returns true, if the queried page item is hidden or it does not exist.
   * @param index Index of a page item.
   */
  protected isPageHidden(index: number): boolean {
    const item = this._items[index];
	if (!item) return true;
    return item.hidden || false;
  }

  /**
   * If true, the previous page button is disabled and thus the user cannot navigate to the previous page.
   */
  protected get disablePreviousButton(): boolean {
    if (!this.showPreviousButton) return true;
    return this.isPageHidden(this.currentItemIndex - 1);
  }

  /**
   * If true, the next page button is disabled and thus the user cannot navigate to the next page.
   */
  protected get disableNextButton(): boolean {
    if (!this.showNextButton) return true;
    return this.isPageHidden(this.currentItemIndex + 1);
  }

}
