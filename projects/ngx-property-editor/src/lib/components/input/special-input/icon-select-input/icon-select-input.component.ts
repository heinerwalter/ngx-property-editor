import { Component, Input } from '@angular/core';
import { InputBaseWithValue } from '../../input-base';
import { getIconDataSource } from './fa-icon-data-source';

/**
 * This component provides a simplified select field for selecting icon classes.
 * By default, the FontAwesome icons are provided as data source.
 * The default icons can be changed using the input property `iconDataSource`.
 */
@Component({
  selector: 'pe-icon-select-input',
  templateUrl: './icon-select-input.component.html',
  styleUrls: ['./icon-select-input.component.scss'],
})
export class IconSelectInputComponent extends InputBaseWithValue<string> {

  /** If true, an additional empty item is added to enable empty selection (`value == undefined`). */
  @Input() public allowEmpty: boolean = false;

  /**
   * An array of selectable icons.
   * The data source items must contain at least the following properties:
   * - `label`: A human-readable label which is interpreted as `[innerHTML]` of the select option elements.
   * - `value`: The value which is emitted via `(valueChange)` when the user selected the item.
   */
  @Input() public dataSource: ({ label: string, value: string } & any)[] = [];

  /**
   * An optional prefix added to the icons from the `iconDataSource` property
   * to create a CSS class which will be added to the default select items.
   */
  protected readonly iconClassPrefix: string | undefined = ''; //'fa-solid fa-';

  public constructor() {
    super();
    this.assignDefaultDataSource();
  }

  /**
   * This function assigns all free solid FontAwesome icons to the `dataSource` property.
   */
  private assignDefaultDataSource(): void {
    this.dataSource = this.getIconDataSource(this.iconClassPrefix, true);
  }

}
