import { Component, OnDestroy } from '@angular/core';
import { LoadingService } from '../../../services/loading-service/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity-indicator-backdrop',
  templateUrl: './activity-indicator-backdrop.component.html',
  styleUrls: ['./activity-indicator-backdrop.component.scss'],
})
export class ActivityIndicatorBackdropComponent implements OnDestroy {

  /**
   * Subscription to the is-loading state in the `interactionService`.
   * @see interactionService.isLoading$
   */
  private isLoadingSubscription: Subscription;

  /** The is-loading state received from the `isLoadingSubscription`. */
  protected isLoading: boolean = false;

  /** Default loading label used if the `isLoadingSubscription` does not provide a label. */
  // TODO: $localize does not work in the library
  private readonly defaultLabel: string = 'Laden'; // $localize`:@@activity-indicator.label.default:Laden`;
  /** Loading label (default or provided by the `isLoadingSubscription`) */
  protected label: string = this.defaultLabel;

  public constructor(public loadingService: LoadingService) {
    // Start is-loading subscription from interactionService
    this.isLoadingSubscription = loadingService.isLoading$
      .subscribe((data) => this.updateIsLoading(data));
  }

  public ngOnDestroy(): void {
    // Stop is-loading subscription when the component is destroyed
    this.isLoadingSubscription?.unsubscribe();
  }

  /**
   * This function is called, when the `isLoadingSubscription` provided a new is-loading state.
   * @param data Data provided by the `isLoadingSubscription`, containing the `loading` state and an optional `label`.
   */
  private updateIsLoading(data: { loading: boolean, label: string | undefined }) {
    this.isLoading = data.loading;
    this.label = data.label || this.defaultLabel;
  }

}
