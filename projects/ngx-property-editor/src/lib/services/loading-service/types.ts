/*
 * This file contains type definitions used by the `LoadingService`.
 */

/**
 * Options for modifying the loading indicator appearance.
 */
export type LoadingOptions = {
  /** Optional label to be displayed with the activity indicator. */
  label?: string | undefined,
  /** If true, the loading action is not displayed. */
  disableLoading?: boolean,
  /**
   * The execution time of the loading action is measured (only in development mode!),
   * if this name is defined. In that case the execution time is stored by this name.
   * @see BenchmarkTimer
   */
  name?: string,
}
