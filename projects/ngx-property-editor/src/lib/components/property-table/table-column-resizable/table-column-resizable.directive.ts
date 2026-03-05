import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * This directive adds a rezizing handle to a header cell of a table.
 */
// Used Tutorial: https://medium.com/@imdebasispanda/resize-table-column-angular-5cb58b67367
@Directive({
  selector: 'th[peTableColumnResizable]',
})
export class TableColumnResizableDirective implements OnInit {

  /**
   * Defines whether or not the column should be resizable.
   */
  @Input('peTableColumnResizable') isResizable: boolean = true;

  /**
   * Refernce of the header cell element on which the border
   * can be dragged to adjust the column width.
   */
  private cellRef: HTMLElement;

  /**
   * Reference of the table element.
   */
  private tableRef?: HTMLTableElement;

  /**
   * True while the resizing handle is dragged with the mouse pressed.
   */
  protected isResiszing: boolean = false;
  
  /** This class is added to the table element while resiszing is in progress. */
  private readonly isResiszingClassName: string = "column-resizing-in-progress";

  /** Initial mouse x coordinate when the resizing handle draggin is started. */
  private startX: number = 0;
  /** Initial header cell width when the resizing handle draggin is started. */
  private startWidth: number = 0;

  public constructor(private elementRef: ElementRef,
                     private renderer: Renderer2) {
    // Get cell reference
    this.cellRef = this.elementRef.nativeElement;
    }

  public ngOnInit(): void {
    // Get table reference
    const row = this.renderer.parentNode(this.cellRef);
    const thead = this.renderer.parentNode(row);
    this.tableRef = this.renderer.parentNode(thead);
  
    if (this.isResizable) {
      this.renderer.addClass(this.cellRef, 'table-column-is-resizable');

      // Add an element to the header cell as a handle for resizing
      const resizer: HTMLDivElement = this.renderer.createElement("div");
      this.renderer.addClass(resizer, 'table-column-resizable-handle');
      this.renderer.appendChild(this.cellRef, resizer);
      // Register mouse events
      this.renderer.listen(resizer, "mousedown", this.onMouseDown);
      this.renderer.listen(this.tableRef, "mousemove", this.onMouseMove);
      this.renderer.listen("document", "mouseup", this.onMouseUp);
    }
  }

  /**
   * This event handler is triggered when the primary mouse
   * button is pressed on the resizing handle element.
   * @param event The mouse event.
   */
  private onMouseDown = (event: MouseEvent) => {
    this.isResiszing = true;
    this.startX = event.pageX;
    this.startWidth = this.cellRef.offsetWidth;
  }

  /**
   * This event handler is triggered when the mouse
   * is moved on the table element.
   * @param event The mouse event.
   */
  private onMouseMove = (event: MouseEvent) => {
    const offset: number = 35;

    if (!this.isResiszing || !event.buttons)
      return;

    this.renderer.addClass(this.tableRef, this.isResiszingClassName);

    // Calculate width of column
    let width = this.startWidth + (event.pageX - this.startX - offset);
    // Set table header cell width
    this.renderer.setStyle(this.cellRef, "width", `${width}px`);
  }

  /**
   * This event handler is triggered when the primary mouse
   * button is released anywhere on the whole document.
   * @param event The mouse event.
   */
  private onMouseUp = (event: MouseEvent) => {
    if (!this.isResiszing) return;
    this.isResiszing = false;
    this.renderer.removeClass(this.tableRef, this.isResiszingClassName);
  }

}
