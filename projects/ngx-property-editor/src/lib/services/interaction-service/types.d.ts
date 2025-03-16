/*
 * This file contains type definitions used by the `InteractionService`.
 */

/**
 * Toast type (info, success, warning or error).
 */
export type ToastType = 'info' | 'success' | 'warning' | 'error';

/**
 * Options for modifying the toast appearance.
 */
export type ToastOptions = {
  /** Change the default time out in milliseconds. */
  timeOut?: number,
  /** Disable time out. Toast must be closed by click. */
  disableTimeOut?: boolean,
  /** Enable HTML tags in toast message. */
  enableHtml?: boolean,
};

/**
 * Options for modifying the alert appearance.
 */
export type AlertOptions = {
  /** Enable HTML tags in alert message. */
  enableHtml?: boolean,
};

/**
 * All options for modifying the alert appearance in addition to
 * `AlertOptions`. This options type is only used by the unspecific
 * `alert()` function.
 */
export type FullAlertOptions = {
  showConfirmButton?: boolean,
  showDenyButton?: boolean,
  showCancelButton?: boolean,
  confirmButtonText?: string | undefined,
  denyButtonText?: string | undefined,
  cancelButtonText?: string | undefined,

  input?: SweetAlertInput,
};
