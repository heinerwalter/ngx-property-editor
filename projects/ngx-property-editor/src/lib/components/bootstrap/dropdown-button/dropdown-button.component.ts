import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ngb-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss']
})
export class DropdownButtonComponent {

  /**
   * Define the bootstrap button style class of the dropdown button (e.g. "btn-primary") here.
   * You can add any other class which should be applied to the <button> element, too.
   */
  @Input() public buttonClass: string = 'btn-primary';

  /**
   * Assign true, if the `.active` class should be added to the dropdown <button> element.
   */
  @Input() public active: boolean = false;

  /**
   * Assign true, if the `.disabled` class should be added to the dropdown <button> element.
   */
  @Input() public disabled: boolean = false;
  
  /**
   * FontAwesome icon displayed on the button.
   *
   * You can either add content to the <button> element by defining the `icon` and `text` properties,
   * or by passing any element as content to the button component.
   */
  @Input() public icon: IconDefinition | undefined = undefined;

  /**
   * Text displayed on the button.
   *
   * You can either add content to the <button> element by defining the `icon` and `text` properties,
   * or by passing any element as content to the button component.
   */
  @Input() public text: string | undefined = undefined;

  /**
   * Define here where to display the menu relative to the button:
   * - `'dropdown'`:  Display menu below the button.
   * - `'dropup'`:    Display menu above the button.
   * - `'dropend'`:   Display menu after the button (right in LTR mode).
   * - `'dropstart'`: Display menu before the button (left in LTR mode).
   */
  @Input() public direction: 'dropdown' | 'dropup' | 'dropend' | 'dropstart' = 'dropdown';

  /**
   * An array which is used to populate the dropdown menu.
   */
  @Input() public dataSource: any[] = [];

  /**
   * Evaluate this property name on the data source items
   * to get the values sent with the `itemClick` event
   * when a dropdown menu item was clicked by the user.
   * If undefined, the whole data source item is used as value.
   */
  @Input() public valuePropertyName: string | undefined = undefined;

  /**
   * Evaluate this property name on the data source items
   * to get a string which is displayed on the dropdown menu items.
   * If undefined, the whole data source item is used as display value.
   */
  @Input() public displayPropertyName: string | undefined = undefined;

  /**
   * Evaluate this property name on the data source items to get a
   * boolean value defining the active state of the dropdown menu items.
   * Without this property no item is marked as active.
   */
  @Input() public isActivePropertyName: string | undefined = undefined;

  /**
   * Evaluate this property name on the data source items to get a
   * boolean value defining the disabled state of the dropdown menu items.
   * Without this property no item is marked as disabled.
   */
  @Input() public isDisabledPropertyName: string | undefined = undefined;

  /**
   * This event is emitted when the user clicked a dropdown menu item.
   * The value (data source item or evaluated `valuePropertyName`)
   * related to the menu item is passed as event argument.
   */
  @Output() public readonly itemClick: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Evaluates a `displayPropertyName` on the given data source `item`.
   * @param item An data source item.
   */
  protected getItemDisplayValue(item: any): string {
    return PEGlobalFunctions.evaluateDisplayPropertyName(this.displayPropertyName, item);
  }

  /**
   * Determines whether the given data source `item` is active.
   * @param item An data source item.
   * @see isActivePropertyName
   */
  protected isItemActive(item: any): boolean {
    if (!item || typeof item !== 'object' || !this.isActivePropertyName) return false;
    return !!item[this.isActivePropertyName];
  }

  /**
   * Determines whether the given data source `item` is disabled.
   * @param item An data source item.
   * @see isDisabledPropertyName
   */
  protected isItemDisabled(item: any): boolean {
    if (!item || typeof item !== 'object' || !this.isDisabledPropertyName) return false;
    return !!item[this.isDisabledPropertyName];
  }

  /**
   * This function is called when the user clicked a dropdown menu item.
   * It emits the `itemClick` event.
   * @param item The data source item related to the clicked dropdown menu item.
   */
  protected onItemClicked(item: any): void {
    item = PEGlobalFunctions.evaluateValuePropertyName(this.valuePropertyName, item);
    this.itemClick.emit(item);
  }

}
