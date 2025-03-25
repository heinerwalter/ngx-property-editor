import { Component, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'pe-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnChanges {

  /** ID attribute of the modal/alert element. */
  @Input() public id: string | undefined = 'my-modal';

  /** Title of the modal window/alert. */
  @Input() public title: string | undefined = undefined;

  /** Choose one of the types provided by SweetAlert2. */
  @Input() public type: SweetAlertIcon | undefined = undefined;

  /** Overrides the default visibility of the cancel button, if not undefined. */
  @Input() public showCancelButton: boolean | undefined = undefined;
  /** Overrides the default visibility of the confirm button, if not undefined. */
  @Input() public showConfirmButton: boolean | undefined = undefined;
  /** Overrides the default visibility of the deny button, if not undefined. */
  @Input() public showDenyButton: boolean | undefined = undefined;
  /** Overrides the default text of the cancel button, if not undefined. */
  @Input() public cancelButtonText: string | undefined = undefined;
  /** Overrides the default text of the confirm button, if not undefined. */
  @Input() public confirmButtonText: string | undefined = undefined;
  /** Overrides the default text of the deny button, if not undefined. */
  @Input() public denyButtonText: string | undefined = undefined;

  /**
   * By default, the modal window can be closed by clicking outside of it.
   * Set this property to true, to disable that behaviour.
   */
  @Input() public disableCloseByBackdropClick: boolean | undefined;

  protected options: SweetAlertOptions = {};

  @ViewChild('sweetalert') public sweetalert?: SwalComponent;

  public constructor() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('type') ||
      changes.hasOwnProperty('showCancelButton') ||
      changes.hasOwnProperty('showConfirmButton') ||
      changes.hasOwnProperty('showDenyButton') ||
      changes.hasOwnProperty('cancelButtonText') ||
      changes.hasOwnProperty('confirmButtonText') ||
      changes.hasOwnProperty('denyButtonText')) {
      this.updateOptions();
    }
  }

  private updateOptions(): void {
    const options: SweetAlertOptions = {};

    switch (this.type) {
      case 'success':
      case 'error':
      case 'warning':
      case 'info':
        options.cancelButtonText = 'OK';
        break;
      case 'question':
        options.confirmButtonText = 'Ja';
        options.denyButtonText = 'Nein';
        break;
    }

    if (this.showCancelButton != undefined) options.showCancelButton = this.showCancelButton;
    if (this.showConfirmButton != undefined) options.showConfirmButton = this.showConfirmButton;
    if (this.showDenyButton != undefined) options.showDenyButton = this.showDenyButton;
    if (this.cancelButtonText != undefined) options.cancelButtonText = this.cancelButtonText;
    if (this.confirmButtonText != undefined) options.confirmButtonText = this.confirmButtonText;
    if (this.denyButtonText != undefined) options.denyButtonText = this.denyButtonText;

    if (this.disableCloseByBackdropClick != undefined) options.allowOutsideClick = !this.disableCloseByBackdropClick;

    this.options = options;
  }

  /**
   * Returns true, if the modal window/alert is visible.
   */
  public get isVisible(): boolean {
    return !!this.sweetalert?.swalVisible;
  }

  /**
   * Shows the content of this component as modal window/alert.
   * @returns Returns a promise waiting for the modal window to be closed again.
   *          The promise returns true, if the confirm button was clicked.
   *          The promise returns false, if the deny button was clicked.
   *          Otherwise, the promise returns undefined (cancel button, escape key, backdrop click).
   */
  public async show(): Promise<boolean | undefined> {
    try {
      const result = await this.sweetalert?.fire();
      if (result?.isConfirmed) return true;
      if (result?.isDenied) return false;
      return undefined;
    } catch {
      return undefined;
    }
  }

  /**
   * Hides the content of this component as modal window/alert.
   * @returns Returns a promise waiting for the modal window to be closed.
   */
  public async hide(): Promise<void> {
    try {
      await this.sweetalert?.close();
    } catch {
    }
  }

  /**
   * This method toggles the visibility of the content of this component as modal window/alert
   * without waiting for a result.
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
      this.hide().then();
    }
  }

}
