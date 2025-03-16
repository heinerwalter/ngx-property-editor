import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalConfig } from 'ngx-toastr/toastr/toastr-config';
import sweetalert, { SweetAlertIcon, SweetAlertInput, SweetAlertResult } from 'sweetalert2';
import { ToastType, ToastOptions, AlertOptions, FullAlertOptions } from './types.d';


/**
 * A service for displaying toast and alert messages.
 * 
 * It uses the package Toastr for toast messages
 * and the package SweetAlert2 for alerts.
 *
 * See Toastr documentation at https://github.com/CodeSeven/toastr#quick-start
 * See SweetAlert2 documentation at https://sweetalert2.github.io
 */
@Injectable({
  providedIn: 'root',
})
export class InteractionService {

  public constructor(private toastrService: ToastrService,
                     private router: Router) {
    // Configure Toastr
    this.toastrService.toastrConfig.positionClass = 'toast-top-right';
    this.toastrService.toastrConfig.progressBar = true;
    this.toastrService.toastrConfig.easeTime = 300;
    this.toastrService.toastrConfig.timeOut = 5000;
    this.toastrService.toastrConfig.extendedTimeOut = 500;
  }

  /**
   * Navigates to another page.
   * @param path URL segments of the path to navigate to.
   * @returns true, if navigation succeeds; false otherwise.
   */
  public async navigate(path: any[]): Promise<boolean> {
    try {
      return await this.router.navigate(path);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // region Toast (Toastr)

  /**
   * Shows a toast message.
   * @param type Toast type (info, success, warning or error).
   * @param title Message title.
   * @param message Message text.
   * @param options Additional options for modifying the toast appearance.
   */
  public toast(type: ToastType,
               title: string, message: string,
               options?: ToastOptions) {
    const config: Partial<GlobalConfig> = {
      timeOut: options?.timeOut || 5000,
      disableTimeOut: options?.disableTimeOut || false,
      enableHtml: options?.enableHtml || false,
    };

    switch (type) {
      case 'info':
        return this.toastrService.info(message, title, config);
      case 'success':
        return this.toastrService.success(message, title, config);
      case 'warning':
        return this.toastrService.warning(message, title, config);
      case 'error':
        return this.toastrService.error(message, title, config);
    }
  }

  /**
   * Shows an info toast message
   * @param title Message title.
   * @param message Message text.
   * @param options Additional options for modifying the toast appearance.
   */
  public info(title: string, message: string, options?: ToastOptions) {
    this.toast('info', title, message, options);
  }

  /**
   * Shows a success toast message
   * @param title Message title.
   * @param message Message text.
   * @param options Additional options for modifying the toast appearance.
   */
  public success(title: string, message: string, options?: ToastOptions) {
    this.toast('success', title, message, options);
  }

  /**
   * Shows a warning toast message
   * @param title Message title.
   * @param message Message text.
   * @param options Additional options for modifying the toast appearance.
   */
  public warning(title: string, message: string, options?: ToastOptions) {
    this.toast('warning', title, message, options);
  }

  /**
   * Shows an error toast message
   * @param message Message text.
   * @param title Message title.
   * @param options Additional options for modifying the toast appearance.
   */
  public error(message: string, title: string = 'Fehler', options?: ToastOptions) {
    this.toast('error', title, message, options);
  }

  /**
   * Removes all currently displayed toast messages.
   */
  public clearToasts(): void {
    this.toastrService.clear();
  }

  // endregion

  // region Alerts (SweetAlert2)

  /**
   * Shows an alert message.
   * @param type Alert type (success, error, warning, info or question).
   * @param title Message title.
   * @param message Message text.
   * @param options Additional options for modifying the alert appearance.
   * @returns A promise with the alert result.
   */
  public alert(type: SweetAlertIcon, title: string, message: string,
               options?: AlertOptions & FullAlertOptions): Promise<SweetAlertResult<Awaited<any>>> {
    return sweetalert.fire({
      icon: type,
      title: title,
      text: options?.enableHtml ? undefined : message,
      html: options?.enableHtml ? message : undefined,
      position: 'center',

      showConfirmButton: options?.showConfirmButton,
      showDenyButton: options?.showDenyButton,
      showCancelButton: options?.showCancelButton,
      confirmButtonText: options?.confirmButtonText || 'OK',
      denyButtonText: options?.denyButtonText || 'Nein',
      cancelButtonText: options?.cancelButtonText || 'Abbrechen',

      input: options?.input || undefined,
    });
  }

  /**
   * Shows an alert with a success message.
   * @param title Message title.
   * @param message Message text.
   * @param options Additional options for modifying the alert appearance.
   * @returns A promise waiting for the alert to be closed.
   */
  public async successAlert(title: string, message: string, options?: AlertOptions): Promise<void> {
    await this.alert('success', title, message, {
      showCancelButton: true,
      cancelButtonText: 'OK',
      ...(options || {}),
    });
  }

  /**
   * Shows an alert with an error message.
   * @param message Message text.
   * @param title Message title.
   * @param options Additional options for modifying the alert appearance.
   * @returns A promise waiting for the alert to be closed.
   */
  public async errorAlert(message: string, title: string = 'Fehler', options?: AlertOptions): Promise<void> {
    await this.alert('error', title, message, {
      showCancelButton: true,
      cancelButtonText: 'OK',
      ...(options || {}),
    });
  }

  /**
   * Shows an alert with a question message.
   * @param title Message title.
   * @param question Message text.
   * @param options Additional options for modifying the alert appearance.
   * @returns A promise with the question response: true for clicking the confirm button;
   *                                                false for clicking the deny button;
   *                                                undefined otherwise.
   */
  public async questionAlert(title: string, question: string, options?: AlertOptions & {
    type?: SweetAlertIcon | undefined,
    showCancelButton?: boolean,
    confirmButtonText?: string | undefined,
    denyButtonText?: string | undefined,
    cancelButtonText?: string | undefined,
  }): Promise<boolean | undefined> {
    const result = await this.alert(options?.type || 'question', title, question, {
      showConfirmButton: true,
      showDenyButton: true,
      ...(options || {}),
      confirmButtonText: options?.confirmButtonText || 'Ja',
    });
    if (result.isConfirmed) return true;
    if (result.isDenied) return false;
    return undefined;
  }
 
  /**
   * Shows an alert with a text input field.
   * @param title Message title.
   * @param message Message text.
   * @param options Additional options for modifying the alert appearance.
   * @returns A promise with the entered text, or undefined on cancel.
   */
  public async textInputAlert(title: string, message: string, options?: AlertOptions & {
    confirmButtonText?: string | undefined,
    cancelButtonText?: string | undefined,
    isPasswordInput?: boolean,
  }): Promise<string | undefined> {
    const result = await this.alert('question', title, message, {
      showConfirmButton: true,
      showCancelButton: true,
      ...(options || {}),
      input: options?.isPasswordInput ? 'password' : 'text',
    });

    if (!result.isConfirmed) return undefined;
    return result.value?.toString().trim() || '';
  }

  /**
   * Shows an alert with a number input field.
   * @param title Message title.
   * @param message Message text.
   * @param options Additional options for modifying the alert appearance.
   * @returns A promise with the entered number, or undefined on cancel.
   */
  public async numberInputAlert(title: string, message: string, options?: AlertOptions & {
    confirmButtonText?: string | undefined,
    cancelButtonText?: string | undefined,
    /** Default number type: int*/
    numberType?: 'int' | 'float',
  }): Promise<number | undefined> {
    const result = await this.alert('question', title, message, {
      showConfirmButton: true,
      showCancelButton: true,
      ...(options || {}),
      input: 'number',
    });

    // Get entered value and parse number
    if (!result.isConfirmed) return undefined;
    const stringValue: string = result.value?.toString().trim() || '';
    if (!stringValue) return undefined;

    let numberValue: number;
    switch (options?.numberType) {
      case 'float':
        numberValue = parseFloat(stringValue);
        break;
      case 'int':
      default:
        numberValue = parseInt(stringValue);
        break;
    }
    if (isNaN(numberValue)) return undefined;

    return numberValue;
  }

  // endregion

}
