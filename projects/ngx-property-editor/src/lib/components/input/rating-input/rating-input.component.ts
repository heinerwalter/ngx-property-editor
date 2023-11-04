import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InputBaseWithValue } from '../input-base';
import { faStar as faStarSolid, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'pe-rating-input',
  templateUrl: './rating-input.component.html',
  styleUrls: ['./rating-input.component.scss'],
})
export class RatingInputComponent extends InputBaseWithValue<number> implements OnChanges {

  /**
   * Maximum rating value (default: 5). Ratings from 1 to `max` can be entered.
   */
  @Input() max: number = 5;

  /**
   * Helper array for the Angular template to be able to iterate over the numbers from 1 to `max`.
   */
  ratingOptions: number [] = [1, 2, 3, 4, 5];

  /** Assign an FontAwesome icon here to replace inactive rating icons (default: empty star). */
  @Input() iconInactive: IconDefinition | undefined = undefined;
  /** Assign an FontAwesome icon here to replace active rating icons (default: filled star). */
  @Input() iconActive: IconDefinition | undefined = undefined;

  /** Style attribute applied to inactive rating icons. */
  @Input() iconStyleInactive: string | undefined = undefined;
  /** Style attribute applied to active rating icons. */
  @Input() iconStyleActive: string | undefined = undefined;

  public readonly iconStarActive: IconDefinition = faStarSolid;
  public readonly iconStarInactive: IconDefinition = faStarRegular;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('max')) {
      if (isNaN(this.max) || this.max < 1) this.max = 1;
      this.ratingOptions = Array.from({ length: this.max }, (_, i) => i + 1);
    }
  }

  /**
   * This method is called, when the user clicked on one of the rating icons.
   * @param i Rating value related to the clicked rating icon.
   */
  onStarClick(i: number): void {
    this.value = i;
    this.emitValueChange(i);
  }

}
