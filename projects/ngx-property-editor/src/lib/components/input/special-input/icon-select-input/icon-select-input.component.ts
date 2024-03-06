import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InputBaseWithValue } from '../../input-base';
import { iconDataSource } from './fa-icon-data-source';

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
export class IconSelectInputComponent extends InputBaseWithValue<string> implements OnChanges {

  /** If true, an additional empty item is added to enable empty selection (`value == undefined`). */
  @Input() public allowEmpty: boolean = false;

  /**
   * An array of selectable icon classes.
   */
  @Input() public iconDataSource: string[] = iconDataSource;

  /**
   * An optional prefix added to the icons from the `iconDataSource` property
   * to create a CSS class which will be added to the select items.
   */
  @Input() iconClassPrefix: string | undefined = 'fa-';

  /**
   * An array from which the user can select one or multiple items.
   */
  protected dataSource: any[] = [];

  public constructor() {
    super();
    this.updateDataSource();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('iconDataSource')) {
      this.updateDataSource();
    }
  }

  /**
   * This function updates the `dataSource` property from the `iconDataSource`.
   */
  private updateDataSource(): void {
    this.dataSource = this.iconDataSource
      .map(icon => ({
        icon: icon,
        class: (this.iconClassPrefix || '') + icon,
      }));
  }

}
