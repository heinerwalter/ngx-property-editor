import { Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BenchmarkTimer } from '../../controller/benchmark-timer';
import { LoadingOptions } from './types';


/**
 * A service for displaying a loading indicator.
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  public constructor() {
  }

  // region Loading Indicator

  /**
   * Count the number of currently active loading actions which are started with
   * `startLoading()` and finished with `endLoading()`. Only if `loadingCount` is zero,
   * the `isLoading` property returns false.
   */
  private loadingCount: number = 0;

  /**
   * Returns true, if currently at least one loading action is active.
   */
  public get isLoading(): boolean {
    return this.loadingCount > 0;
  }

  /**
   * Observable version of `isLoading`.
   * The Observer is triggered with `{loading: true}`, when a loading action is started,
   * and it is triggered with `{loading: false}`, when the loading action is finished.
   * Additionally, a label to be displayed with the activity indicator is passed as second property
   * (e.g. `{loading: true, label: 'Loading'}`).
   */
  public isLoading$: BehaviorSubject<{ loading: boolean, label: string | undefined }> =
    new BehaviorSubject<{ loading: boolean, label: string | undefined }>({ loading: this.isLoading, label: undefined });

  /**
   * Push changed `isLoading` state to the isLoading$ observers.
   * @param label Optional label to be displayed with the activity indicator.
   */
  private pushIsLoading(label: string | undefined = undefined): void {
    this.isLoading$.next({ loading: this.isLoading, label: label });
  }

  /**
   * Start a new loading action.
   * Whenever at least one loading action is active, an activity indicator with a backdrop
   * is displayed across the whole page to prevent the user from starting more actions.
   *
   * Important:
   * Make sure to call `endLoading()` after each `startLoading()`.
   * Otherwise, the application will be blocked forever.
   * @param label Optional label to be displayed with the activity indicator.
   * @see endLoading
   */
  public startLoading(label: string | undefined = undefined): void {
    const isFirstLoading: boolean = this.loadingCount == 0;

    this.loadingCount++;

    if (isFirstLoading) {
      this.pushIsLoading(label);
    }
  }

  /**
   * Ends a previously started loading action.
   * Whenever at least one loading action is active, an activity indicator with a backdrop
   * is displayed across the whole page to prevent the user from starting more actions.
   *
   * Make sure to not call `endLoading()` before `startLoading()`.
   * @see startLoading
   */
  public endLoading(): void {
    if (this.loadingCount == 0) {
      console.warn('Tried to end loading, but loading count is 0.');
      return;
    }
    this.loadingCount--;

    const isFirstLoading: boolean = this.loadingCount == 0;
    if (isFirstLoading) {
      this.pushIsLoading(undefined);
    }
  }

  /**
   * If true, `startAndEndLoading()` writes the start and end of loading actions to the console.
   */
  private readonly enableLogLoading: boolean = false;
  /**
   * If true, `startAndEndLoading()` writes the result of the benchmark timer
   * of each loading action to the console.
   */
  private readonly enableLogLoadingBenchmarkTimer: boolean = false;

  /**
   * Starts a new loading action before the given loading action function is executed
   * and automatically ends the loading action after the function is completed.
   * @param action The loading action function which should be surrounded by `startLoading()` and `endLoading()`.
   * @param options Additional options for modifying the loading indicator appearance.
   * @see startAndEndLoadingAsync
   */
  public startAndEndLoading<T>(action: () => T,
                               options?: LoadingOptions): T {
    // #1 Loading Indicator
    const enableLoading: boolean = !options?.disableLoading;
    // #2 Log Loading Start and End
    const enableLogLoading: boolean = this.enableLogLoading && isDevMode() && enableLoading;
    // #3 Benchmark Timer
    const enableBenchmarkTimer: boolean = isDevMode() && !!options?.name;
    let timer: BenchmarkTimer | undefined;

    const start = () => {
      // #1
      if (enableLoading) this.startLoading(options?.label);
      // #2
      if (enableLogLoading) console.log(''.padStart((this.loadingCount - 1) * 2, '+ ') + 'start ' + options?.name);
      // #3
      if (enableBenchmarkTimer) timer = new BenchmarkTimer(options?.name || '');
    };

    const end = () => {
      // #3
      if (this.enableLogLoadingBenchmarkTimer) timer?.stopAndWrite();
      else timer?.stop();
      // #2
      if (enableLogLoading) console.log(''.padStart((this.loadingCount - 1) * 2, '+ ') + 'end ' + options?.name);
      // #1
      if (enableLoading) this.endLoading();
    };

    start();

    let isAsync: boolean = false;
    try {
      const result: T = action();

      // Handle promises
      if (result instanceof Promise) {
        isAsync = true;
        result.finally(end);
      }

      return result;

    } finally {
      if (!isAsync)
        end();
    }
  }

  /**
   * An alternate version of `startAndEndLoading()` for asynchronous loading actions.
   * Starts a new loading action before the given loading action function is executed
   * and automatically ends the loading action after the function is completed.
   * @param action The loading action function which should be surrounded by `startLoading()` and `endLoading()`.
   * @param options Additional options for modifying the loading indicator appearance.
   * @see startAndEndLoading
   */
  public startAndEndLoadingAsync<T>(action: () => Promise<T>,
                                    options?: LoadingOptions): Promise<T> {
    return this.startAndEndLoading<Promise<T>>(action, options);
  }

  // endregion

}
