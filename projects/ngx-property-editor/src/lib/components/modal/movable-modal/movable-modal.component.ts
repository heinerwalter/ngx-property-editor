import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';


/**
 * Type of the position of the top left corner of the modal window.
 */
export type MovableModalPosition = {
  /** X coordinate of the top left corner of modal window in pixel. */
  x: number,
  /** Y coordinate of the top left corner of modal window in pixel. */
  y: number,
  /** Optional minimum distance between the modal window and the browser window bounds. */
  minWindowMargin?: number,
};


@Component({
  selector: 'pe-movable-modal',
  templateUrl: './movable-modal.component.html',
  styleUrls: ['./movable-modal.component.scss'],
})
export class MovableModalComponent {

  /** ID of the modal window element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();
  /** Class of the modal window element. */
  @Input() public modalClass: string | undefined = undefined;

  /** Header text of the modal window. */
  @Input() public header: string = '';

  /** Width of the modal window in pixel. */
  @Input() public width: number = 200;
  /** This event is emitted when the width of the modal window has changed. */
  @Output() public readonly widthChange: EventEmitter<number> = new EventEmitter<number>();

  /** Height of the modal window in pixel. */
  @Input() public height: number = 400;
  /** This event is emitted when the height of the modal window has changed. */
  @Output() public readonly heightChange: EventEmitter<number> = new EventEmitter<number>();

  /** Position of the top left corner of the modal window in pixel. */
  @Input() public position: MovableModalPosition = { x: 100, y: 100 };
  /** This event is emitted when the position of the top left corner of the modal window has changed. */
  @Output() public readonly positionChange: EventEmitter<MovableModalPosition> =
    new EventEmitter<MovableModalPosition>();

  /** True, if the modal window is visible. */
  private _isVisible: boolean = false;
  /** True, if the modal window is visible. */
  public get isVisible(): boolean {
    return this._isVisible;
  }

  public constructor() {
  }

  /**
   * Shows the modal window.
   * @param position Optional initial position of the top left corner of the modal window in pixel.
   */
  public show(position?: MovableModalPosition): void {
    if (position)
      this.setPosition(position);
    this._isVisible = true;
  }

  /**
   * Hides the modal window.
   */
  public hide(): void {
    this._isVisible = false;
  }

  /**
   * This method toggles the visibility of the modal window.
   * @param newValue If not `undefined`, the visibility of the modal window
   *                 is set to the given value instead of being toggled.
   * @param position Optional initial position of the top left corner of the modal window in pixel.
   * @returns The new visibility value.
   */
  public toggleVisibility(newValue: boolean | undefined = undefined,
                          position?: MovableModalPosition): boolean {
    if (position)
      this.setPosition(position);

    const isVisible: boolean = this.isVisible;

    if (newValue == undefined)
      newValue = !isVisible;
    else if (newValue == isVisible)
      return this.isVisible;

    if (newValue) {
      this.show();
    } else {
      this.hide();
    }

    return this.isVisible;
  }

  /**
   * The click event of a button for toggling the visibility of the modal window
   * can be passed directly to this method.
   * @param event Button click event.
   * @returns The new visibility value.
   */
  public onToggleVisibilityButtonClick(event: MouseEvent): boolean {
    event?.preventDefault();
    let position: MovableModalPosition | undefined = undefined;
    if (event?.target instanceof HTMLElement) {
      const rect = event.target.getBoundingClientRect();
      position = { x: rect.left, y: rect.bottom };
    } else if (event) {
      position = { x: event.clientX, y: event.clientY };
    }
    if (position) position.minWindowMargin = 10;

    const isVisible: boolean = this.toggleVisibility(undefined, position);

    if (event?.target instanceof HTMLButtonElement) {
      event.target.classList.toggle('active', isVisible);
    }

    return isVisible;
  }

  /**
   * Assigns a new position of the top left corner of the modal window.
   * @param position Position of the top left corner of the modal window in pixel.
   */
  public setPosition(position: MovableModalPosition): void {
    if (!position) return;

    // Fix position for the modal window to not leave the browser window
    let margin: number = position.minWindowMargin || 0;
    if (margin < 0) margin = 0;

    let minX: number = margin;
    let minY: number = margin;
    if (position.x == undefined || position.x < minX) position.x = minX;
    if (position.y == undefined || position.y < minY) position.y = minY;

    let maxX: number = window.innerWidth - this.width - margin;
    if (maxX < 0) maxX = 0;
    let maxY: number = window.innerHeight - this.height - margin;
    if (maxY < 0) maxY = 0;
    if (position.x > maxX) position.x = maxX;
    if (position.y > maxY) position.y = maxY;

    // Don't reapply the same position
    if (position.x == this.position?.x && position.y == this.position?.y) return;

    // Apply position
    this.position = position;
    this.positionChange.emit(this.position);
  }

  /**
   * Assigns a new size of the modal window.
   * @param size Object with the new width and height of the modal window in pixel.
   *             If a property (width or height) is undefined, the old value remains unchanged.
   */
  public setSize(size: { width?: number | undefined, height?: number | undefined }): void {
    if (size?.width && size.width != this.width) {
      this.width = size.width;
      this.widthChange.emit(this.width);
    }

    if (size?.height && size.height != this.height) {
      this.height = size.height;
      this.heightChange.emit(this.height);
    }
  }

  // region Moving the modal window via drag and drop

  /** True while the modal window element is being dragged. */
  protected isDrag: boolean = false;
  /** Initial `DragEvent.offsetX` of the drag start event. */
  private dragStartOffsetX: number = 0;
  /** Initial `DragEvent.offsetY` of the drag start event. */
  private dragStartOffsetY: number = 0;

  /**
   * This method is called when a drag-start event occurred on the modal window.
   * @param event Information on the drag event.
   */
  protected onDragstart(event: DragEvent): void {
    this.isDrag = true;
    this.dragStartOffsetX = event.offsetX;
    this.dragStartOffsetY = event.offsetY;
  }

  /**
   * This method is called when a drag-end event occurred on the modal window.
   * @param event Information on the drag event.
   */
  protected onDragend(event: DragEvent): void {
    this.setPosition({
      x: event.clientX - this.dragStartOffsetX,
      y: event.clientY - this.dragStartOffsetY,
    });

    this.isDrag = false;
    this.dragStartOffsetX = 0;
    this.dragStartOffsetY = 0;
  }

}
