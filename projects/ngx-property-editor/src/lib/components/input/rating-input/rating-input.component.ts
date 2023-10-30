import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faStar, faStarHalfAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { InputBaseWithValue } from '../input-base';

@Component({
  selector: 'app-rating-input',
  templateUrl: './rating-input.component.html',
  styleUrls: ['./rating-input.component.scss'],
})
export class RatingInputComponent extends InputBaseWithValue<number> implements OnChanges {

  /** Maximum rating value (default: 5). Ratings from 1 to `max` can be entered. */
  @Input() max: number = 5;

  /** Helper array for the Angular template to be able to iterate over the numbers from 1 to `max`. */
  ratingOptions: number [] = [1, 2, 3, 4, 5];

  iconStarInactive: IconDefinition = faStarEmpty;
  iconStarHalfActive: IconDefinition = faStarHalfAlt;
  iconStarActive: IconDefinition = faStar;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('max')) {
      if (isNaN(this.max) || this.max < 1) this.max = 1;
      this.ratingOptions = Array.from({ length: this.max }, (_, i) => i + 1);
    }
  }

  onStarClick(i: number): void {
    this.value = i;
    this.emitValueChange(i);
  }

}
