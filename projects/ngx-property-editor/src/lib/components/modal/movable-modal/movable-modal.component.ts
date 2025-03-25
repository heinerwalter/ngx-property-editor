import { Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pe-movable-modal',
  templateUrl: './movable-modal.component.html',
  styleUrls: ['./movable-modal.component.scss'],
})
export class MovableModalComponent {

  /** Class of the modal window container. */
  @Input() public modalContainerClass: string | undefined = undefined;
  /** Class of the modal window. */
  @Input() public modalClass: string | undefined = undefined;

  /** Header text of the modal window. */
  @Input() public header: string = '';

  /** Size of the modal window. */
  @Input() public size?: 'sm' | 'lg' | 'xl' | string | undefined = undefined;

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

  public constructor() {
  }

  /**
   * Shows the modal window.
   * @returns Promise waiting for the modal window to be closed again.
   */
  public async show(): Promise<void> {
    try {
      this.modalRef = this.modalService.open(this.contentTemplate, {
        windowClass: this.modalContainerClass,
        modalDialogClass: this.modalClass,
        ariaLabelledBy: 'modal-basic-title',
        backdrop: false,
        size: this.size,
      });
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

}
