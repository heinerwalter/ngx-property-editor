import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pe-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {

  /** Total number of entries.  */
  @Input() public collectionSize: number = 0;

  /** Returns the total number of pages. */
  protected get pageCount(): number {
    return Math.ceil(this.collectionSize / this.pageSize);
  }

  /** Index of the currently visible page starting with 0. */
  @Input() public page: number = 0;

  /**
   * This event is emitted when the currently visible page changed.
   * The index of the currently visible page is passed as a event argument.
   */
  @Output() public readonly pageChange: EventEmitter<number> = new EventEmitter<number>();

  // region Pagination Options

  /**
   * Choose the pagination type:
   * - 'buttons': A button group with page index buttons.
   * - 'input': A numeric input for the user to enter a page number.
   * - 'both': Input and buttons (default).
   */
  @Input() public pagigantionType: 'buttons' | 'input' | 'both' = 'both';

  /**
   * If true, the total number of pages and entries
   * is displayed in front of the pagination controls.
   * @example "Page 1 of 5 (42 elements)"
   */
  @Input() public showInfoText: boolean = true;

  /**
   * Generates the info text for `showInfoText == true`.
   * It contains the total number of pages and entries.
   * @see showInfoText
   */
  protected get infoText(): string {
    return `Page ${ this.page + 1 } of ${ this.pageCount } (${ this.collectionSize } elements)`;
  }

  /**
   * Only if the pagination buttons are visible (see `pagigantionType`):
   * If true, a button for selecting the first and last page is always visible.
   */
  @Input() public showFirstAndLastPage: boolean = true;
  /**
   * Only if the pagination buttons are visible (see `pagigantionType`):
   * This amount of pages before and after the current page is visible.
   */
  @Input() public showPagesBeforeAndAfter: number = 2;

  /**
   * These pages are displayed as buttons in the pagination control.
   * They include the current page, some pages before and after it,
   * and the first and last page.
   * If there is a gap between the first or last page and pages
   * around the current page, an ellipsis is displayed inbetween.
   * @see updateVisiblePageOptions
   */
  protected visiblePageOptions: (number | 'ellipsis')[] = [];

  // endregion

  // region Page Size Options

  /** Current number of entries per page.  */
  @Input() public pageSize: number = 10;

  /**
   * This event is emitted when the number of entries per page changed.
   * The current number of entries per page is passed as a event argument.
   */
  @Output() public readonly pageSizeChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * If true, a select input is displayed which allows the user
   * to choose the number of entries per page (see `pageSize`).
   * @see pageSizeOptions
   */
  @Input() public showPageSizeSelector: boolean = true;

  /**
   * This array contains page sizes from which the user can choose one in a select input.
   * @see showPageSizeSelector
   */
  @Input() public pageSizeOptions: number[] = [ 5, 10, 20, 50, 100 ];

  // endregion

  public constructor() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('page')) {
      this.page = this.fixPage(this.page);
    }
    if (changes.hasOwnProperty('collectionSize') ||
        changes.hasOwnProperty('page') ||
        changes.hasOwnProperty('pageSize')) {
      this.updateVisiblePageOptions();
    }
  }

  /**
   * Updates the `visiblePageOptions` array.
   */
  private updateVisiblePageOptions(): void {
    const visiblePageOptions: (number | 'ellipsis')[] = [];
    const pageCount = this.pageCount;
    const showPagesBeforeAndAfter = Math.max(this.showPagesBeforeAndAfter, 0);

    // Determine the first and last visible page index
    let firstPage = this.page - showPagesBeforeAndAfter;
    let lastPage = this.page + showPagesBeforeAndAfter;
    firstPage = this.fixPage(firstPage);
    lastPage = this.fixPage(lastPage);
    
    // Add all page indices from first to last to the array
    for (let i = firstPage; i <= lastPage; i++) {
      visiblePageOptions.push(i);
    }

    // Add first and last pages, if showFirstAndLastPage == true
    if (this.showFirstAndLastPage && !visiblePageOptions.includes(0)) {
      if (firstPage >= 2)
        visiblePageOptions.unshift('ellipsis');
      visiblePageOptions.unshift(0);
    }

    if (this.showFirstAndLastPage && !visiblePageOptions.includes(pageCount - 1)) {
      if (lastPage <= pageCount - 3)
        visiblePageOptions.push('ellipsis');
      visiblePageOptions.push(pageCount - 1);
    }

    // Assign new visiblePageOptions
    this.visiblePageOptions = visiblePageOptions;
  }

  /**
   * Fixes the given page index to fit into the interval [0, pageCount].
   */
  private fixPage(page: number): number {
    if (page < 0) page = 0;
    if (page >= this.pageCount) page = this.pageCount - 1;
    return page;
  }

  /**
   * Changes the visible page.
   * @param page The index of the new visible page starting with 0.
   * @param updateVisiblePageOptions If true, `updateVisiblePageOptions()` is called after the change.
   */
  public changePage(page: number, updateVisiblePageOptions: boolean = true): void {
    page = this.fixPage(page);
    if (page === this.page) return;

    this.page = page;
    this.pageChange.emit(this.page);

    if (updateVisiblePageOptions)
      this.updateVisiblePageOptions();
  }

  /**
   * Changes the number of entries per page.
   * @param pageSize The new number of entries per page.
   */
  public changePageSize(pageSize: number): void {
    if (pageSize === this.pageSize) return;

    this.pageSize = pageSize;
    this.pageSizeChange.emit(this.pageSize);
    this.changePage(this.page, false);
    this.updateVisiblePageOptions();
  }

}
