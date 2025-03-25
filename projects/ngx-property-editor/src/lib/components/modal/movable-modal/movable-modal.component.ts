import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';

@Component({
  selector: 'pe-movable-modal',
  templateUrl: './movable-modal.component.html',
  styleUrls: ['./movable-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MovableModalComponent implements OnChanges {

  /**
   * Unique identifier of the modal window element assigned via class,
   * because we cannot access the id attribute.
   */
  private readonly idClass: string = 'movable-modal-id-' + PEGlobalFunctions.generateRandomId();
  /** Class of the modal window container element. */
  @Input() public modalContainerClass: string | undefined = undefined;
  /** Class of the modal window element. */
  @Input() public modalClass: string | undefined = undefined;

  /** Header text of the modal window. */
  @Input() public header: string = '';

  /** Size of the modal window. */
  @Input() public size?: 'sm' | 'lg' | 'xl' | string | undefined = undefined;

  /**
   * Position of the top left corner of the modal window in pixel.
   * @see positionChange
   */
  @Input() public position: { x: number, y: number } = { x: 100, y: 100 };
  /**
   * This event is emitted when the position of the top left corner of the modal window has changed.
   */
  @Output() public readonly positionChange: EventEmitter<{ x: number, y: number }> =
    new EventEmitter<{ x: number; y: number }>();

  /** Returns true, if the modal window is visible (default: false). */
  public get isVisible(): boolean {
    return !!this.modalRef;
  }

  /** Bootstrap modal service used to display a modal window. */
  private modalService = inject(NgbModal);

  /** Reference of the Angular template element with the modal window content. */
  @ViewChild('contentTemplate', { static: true }) protected contentTemplate?: TemplateRef<any>;

  /** Reference to an opened bootstrap modal window. */
  private modalRef?: NgbModalRef = undefined;
  /** HTML element of an opened modal window. */
  private modalElement?: HTMLElement = undefined;

  public constructor() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('position')) {
      this.updatePosition();
    }
  }

  /**
   * Shows the modal window.
   * @returns Promise waiting for the modal window to be closed again.
   */
  public async show(): Promise<void> {
    try {
      this.modalRef = this.modalService.open(this.contentTemplate, {
        windowClass: 'movable-modal-container ' + (this.modalContainerClass || ''),
        modalDialogClass: 'movable-modal ' + this.idClass + ' ' + (this.modalClass || ''),
        ariaLabelledBy: 'modal-basic-title',
        backdrop: false,
        size: this.size,
      });
      this.modalElement = document.getElementsByClassName(this.idClass)?.[0] as HTMLElement | undefined;
      if (this.modalElement) {
        this.modalElement.draggable = true;
        this.modalElement.addEventListener('dragstart', (event) => this.onDragStart(event));
        this.modalElement.addEventListener('dragend', (event) => this.onDragEnd(event));
      }
      this.updatePosition();

      const result = await this.modalRef.result;
      this.modalRef = undefined;
      console.debug(`Modal closed with: ${result}.`);
    } catch (reason) {
      this.modalRef = undefined;
      console.debug(`Modal dismissed ${this.getDismissReason(reason)}.`);
    }
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  /**
   * Hides the modal window.
   */
  public hide(): void {
    if (!this.modalRef) return;
    this.modalRef.close();
    this.modalRef = undefined;
  }

  /**
   * This method toggles the visibility of the modal window.
   * @property newValue If not `undefined`, the visibility of the modal
   *                    is set to the given value instead of being toggled.
   */
  public toggleVisibility(newValue: boolean | undefined = undefined): void {
    const isVisible = this.isVisible;

    if (newValue == undefined)
      newValue = !isVisible;
    else if (newValue == isVisible)
      return;

    if (newValue) {
      this.show().then();
    } else {
      this.hide();
    }
  }

  /**
   * Updates the position of the modal window element to
   * match the `position` property of this component.
   */
  private updatePosition(): void {
    if (!this.isVisible || !this.modalElement) return;

    this.modalElement.style.left = (this.position?.x || 0) + 'px';
    this.modalElement.style.top = (this.position?.y || 0) + 'px';
  }

  /**
   * Assigns a new position of the top left corner of the modal window.
   * @param x X coordinate of the top left corner of modal window in pixel.
   * @param y Y coordinate of the top left corner of modal window in pixel.
   */
  public setPosition(x: number, y: number): void {
    if (x == this.position?.x && y == this.position?.y) return;

    this.position = { x, y };
    this.positionChange.emit(this.position);

    this.updatePosition();
  }

  /**
   * Moves the modal window by a given distance.
   * @param offsetX Change the X coordinate of the top left corner of modal window by this amount in pixel.
   * @param offsetY Change the Y coordinate of the top left corner of modal window by this amount in pixel.
   */
  public setPositionOffset(offsetX: number, offsetY: number): void {
    this.setPosition((this.position?.x || 0) + offsetX, (this.position?.y || 0) + offsetY);
  }

  // region Moving the modal window via drag and drop

  private isDrag: boolean = false;
  /** Initial `DragEvent.offsetX` of the drag start event. */
  private dragStartOffsetX: number = 0;
  /** Initial `DragEvent.offsetY` of the drag start event. */
  private dragStartOffsetY: number = 0;

  /**
   * This method is called when a drag-start event occurred on the modal window.
   * @param event Information on the drag event.
   */
  private onDragStart(event: DragEvent): void {
    this.isDrag = true;
    this.dragStartOffsetX = event.offsetX;
    this.dragStartOffsetY = event.offsetY;
  }

  /**
   * This method is called when a drag-end event occurred on the modal window.
   * @param event Information on the drag event.
   */
  private onDragEnd(event: DragEvent): void {
    this.setPosition(event.clientX - this.dragStartOffsetX, event.clientY - this.dragStartOffsetY);

    this.isDrag = false;
    this.dragStartOffsetX = 0;
    this.dragStartOffsetY = 0;
  }

}
