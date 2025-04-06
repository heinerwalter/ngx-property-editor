import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pe-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {

  /** Total number of entries.  */
  @Input() public collectionSize: number = 0;

  /** Index of the currently visible page starting with 0. */
  @Input() public page: number = 0;

  /**
   * This event is emitted when the currently visible page changed.
   * The index of the currently visible page is passed as a event argument.
   */
  @Output() public readonly pageChange: EventEmitter<number> = new EventEmitter<number>();

  // region Page Size

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
  @Input() public pageSizeOptions: number[] = [10];

  // endregion

  public constructor() {
  }

  /**
   * Changes the visible page.
   * @param page The index of the new visible page starting with 0.
   */
  public changePage(page: number): void {
    this.page = page;
    this.pageChange.emit(this.page);
  }

  /**
   * Changes the number of entries per page.
   * @param pageSize The new number of entries per page.
   */
  public changePageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.pageSizeChange.emit(this.pageSize);
  }

}
