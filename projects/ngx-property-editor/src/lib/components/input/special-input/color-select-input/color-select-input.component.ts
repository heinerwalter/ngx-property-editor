import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InputBaseWithValue } from '../../input-base';

/**
 * This component provides a simplified select field for selecting color classes.
 * By default, the Bootstrap background colors (primary, secondary, success, danger, etc.)
 * are provided as data source. The default colors can be changed using the input property
 * `colorDataSource`.
 */
@Component({
  selector: 'pe-color-select-input',
  templateUrl: './color-select-input.component.html',
  styleUrls: ['./color-select-input.component.scss'],
})
export class ColorSelectInputComponent extends InputBaseWithValue<string> implements OnChanges {

  /** If true, an additional empty item is added to enable empty selection (`value == undefined`). */
  @Input() public allowEmpty: boolean = false;

  /**
   * An array of selectable color classes.
   */
  @Input() public colorDataSource: string[] = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ];

  /**
   * An optional prefix added to the colors from the `colorDataSource` property
   * to create a CSS class which will be added to the select items.
   */
  @Input() colorClassPrefix: string | undefined = 'text-bg-';

  /**
   * An array from which the user can select one or multiple items.
   */
  protected dataSource: any[] = [];

  public constructor() {
    super();
    this.updateDataSource();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('colorDataSource')) {
      this.updateDataSource();
    }
  }

  /**
   * This function updates the `dataSource` property from the `colorDataSource`.
   */
  private updateDataSource(): void {
    this.dataSource = this.colorDataSource
      .map(color => ({
        color: color,
        class: (this.colorClassPrefix || '') + color,
      }));
  }

}
