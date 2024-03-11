import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconName, findIconDefinition, IconDefinition, parse, IconLookup } from '@fortawesome/fontawesome-svg-core'
import { InputBaseWithValue } from '../../input-base';
import { getIconDataSource } from './fa-icon-data-source';

// See FontAwesome library documentation: https://docs.fontawesome.com/apis/javascript/icon-library
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

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
   * An array of selectable icons.
   * The data source items must contain at least the following properties:
   * - `label`: A human-readable label (HTML) which is added as `[innerHTML]` to the select option elements.
   * - `value`: The icon name which is emitted via `(valueChange)` when the user selected the item.
   */
  @Input() public dataSource: ({ label: string, value: string } & any)[] = [];

  /**
   * If false (default), the human-readable label of the data-source items is displayed on the select option elements.
   * If true, the icon name (value of the data-source items) is displayed on the select option elements.
   */
  @Input() public displayIconValue: boolean = false;
  
  /**
   * An optional prefix added to the icons from the `iconDataSource` property
   * to create a CSS class which will be added to the default select items.
   */
  protected readonly iconClassPrefix: string | undefined = ''; //'fa-solid fa-';

  /** IconDefinition of the currently selected icon. */
  protected selectedIcon: IconDefinition | undefined = undefined;

  public constructor() {
    super();
    this.assignDefaultDataSource();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('value'))
      this.updateSelectedIcon();
  }

  protected override emitValueChange(newValue: string | undefined): void {
    super.emitValueChange(newValue);
    this.updateSelectedIcon();
  }

  /**
   * This function assigns all free solid FontAwesome icons to the `dataSource` property.
   */
  private assignDefaultDataSource(): void {
    this.dataSource = getIconDataSource(this.iconClassPrefix);
  }

  /**
   * Updates the `selectedIcon` property from the current `value`.
   */
  private updateSelectedIcon(): void {
    this.selectedIcon = this.value ? this.getIconDefinition(this.value) : undefined;
  }

  /**
   * Converts a FontAwesome icon name to an icon definition object.
   * @param icon Name or alias of a FontAwesome icon (e.g. 'user', 'fa-user', 'fa-solid fa-user').
   * @returns The FontAwesome icon definition object, or undefined if the given icon name is invalid.
   */
  protected getIconDefinition(icon: string | undefined): IconDefinition | undefined {
    if (!icon) return undefined;

    try {
      const iconLookup = parse.icon(icon);
      if (!iconLookup) return undefined;
      return findIconDefinition(iconLookup) || undefined;
    } catch {
      return undefined;
    }
  }
}
