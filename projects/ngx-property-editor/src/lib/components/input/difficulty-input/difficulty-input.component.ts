import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { InputBaseWithValue } from '../input-base';
import { iconDifficulty1, iconDifficulty2, iconDifficulty3, iconDifficulty4, iconDifficulty5, iconDifficultyEmpty } from './icons-difficulty-data-urls';

@Component({
  selector: 'pe-difficulty-input',
  templateUrl: './difficulty-input.component.html',
  styleUrls: ['./difficulty-input.component.scss'],
})
export class DifficultyInputComponent extends InputBaseWithValue<number> implements OnInit, OnChanges {

  /**
   * Maximum value (5). Values from 1 to `max` can be selected.
   */
  protected max: number = 5;

  /**
   * Value of the hovered item.
   * If no item is hovered, the `hoveredValue` equals the `value`.
   */
  protected hoverValue: number | undefined = undefined;

  // Icon images as base64 encoded data URLs:
  protected readonly iconDifficultyEmpty: string = iconDifficultyEmpty;

  public constructor() {
    super();
  }

  public ngOnInit(): void {
    this.hoverValue = this.value;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('value')) {
      this.hoverValue = this.value;
    }
  }
 
  /**
   * Returns one of the non-empty icon images (base64 encoded data URLs)
   * matching the given index.
   * @param index Index of a <ngb-rating> item.
   */
  protected getActiveIcon(index: number) {
    if (index <= 0) return iconDifficulty1;
    if (index <= 1) return iconDifficulty2;
    if (index <= 2) return iconDifficulty3;
    if (index <= 3) return iconDifficulty4;
    return iconDifficulty5;
  }

  /**
   * This method is triggered, when the mouse hovers over an item.
   * @param index Index of the hovered item or undefined for leaving an item.
   */
  protected onHover(index: number | undefined): void {
    if (this.disabled || this.readonly) return;

    if (index != undefined) // hover
      this.hoverValue = index;
    else // leave
      this.hoverValue = this.value;
  }

}
