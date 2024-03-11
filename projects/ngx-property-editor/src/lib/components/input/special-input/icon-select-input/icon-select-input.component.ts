import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { InputBaseWithValue } from '../../input-base';
import { getIconDataSource } from './fa-icon-data-source';
import { PEGlobalFunctions } from '../../../../controller/pe-global-functions';

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
   * FontAwesome icon definition of the currently selected icon.
   * The value of this property is emitted via `iconChange`.
   */
  protected icon: IconDefinition | undefined = undefined;

  /**
   * This event is triggered when the user changed the selected icon.
   * The FontAwesome icon definition of the newly selected icon is passed as event argument.
   */
  @Output() public readonly iconChange: EventEmitter<IconDefinition | undefined> = new EventEmitter<IconDefinition | undefined>();
  
  public constructor() {
    super();
    this.assignDefaultDataSource();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('value'))
      this.updateIconFromValue();
  }

  protected override emitValueChange(newValue: string | undefined): void {
    super.emitValueChange(newValue);
    this.updateIconFromValue();
  }

  /**
   * This function assigns all free solid FontAwesome icons to the `dataSource` property.
   */
  private assignDefaultDataSource(): void {
    this.dataSource = getIconDataSource();
  }

  /**
   * Updates the `icon` property from the current `value`.
   */
  private updateIconFromValue(): void {
    this.icon = this.value ? PEGlobalFunctions.getFontAwesomeIconDefinition(this.value) : undefined;
    this.iconChange.emit(this.icon);
  }
}
