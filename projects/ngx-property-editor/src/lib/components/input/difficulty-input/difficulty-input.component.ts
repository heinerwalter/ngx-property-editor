import { Component } from '@angular/core';
import { InputBaseWithValue } from '../input-base';

@Component({
  selector: 'pe-difficulty-input',
  templateUrl: './difficulty-input.component.html',
  styleUrls: ['./difficulty-input.component.scss'],
})
export class DifficultyInputComponent extends InputBaseWithValue<number> {

  /**
   * Maximum value (5). Values from 1 to `max` can be selected.
   */
  protected max: number = 5;

  // Icon images as base64 encoded data URLs:
  protected readonly iconDifficulty1: string = 'data:image/png;base64,...';
  protected readonly iconDifficulty2: string = 'data:image/png;base64,...';
  protected readonly iconDifficulty3: string = 'data:image/png;base64,...';
  protected readonly iconDifficulty4: string = 'data:image/png;base64,...';
  protected readonly iconDifficulty5: string = 'data:image/png;base64,...';
  protected readonly iconDifficultyEmpty: string = 'data:image/png;base64,...';

  public constructor() {
    super();
  }

  /**
   * Returns one of the non-empty icon images (base64 encoded data URLs)
   * matching the given index.
   * @param index Index of a <ngb-rating> item.
   */
  protected getActiveIcon(index: number) {
    if (index <= 0) return this.iconDifficulty1;
    if (index <= 1) return this.iconDifficulty2;
    if (index <= 2) return this.iconDifficulty3;
    if (index <= 3) return this.iconDifficulty4;
    return this.iconDifficulty5;
  }

}
