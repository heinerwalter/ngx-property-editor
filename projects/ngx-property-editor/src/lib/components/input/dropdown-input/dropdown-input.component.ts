import { Component, Input } from '@angular/core';
import { InputBaseWithValueAndDataSource } from '../input-base';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { PlacementArray } from '@ng-bootstrap/ng-bootstrap/util/positioning';

@Component({
  selector: 'pe-dropdown-input',
  templateUrl: './dropdown-input.component.html',
  styleUrls: ['./dropdown-input.component.scss'],
})
export class DropdownInputComponent extends InputBaseWithValueAndDataSource<any | any[]> {

  /**
   * Define the bootstrap button style class of the dropdown button (e.g. "btn-primary") here.
   * You can add any other class which should be applied to the <button> element, too.
   */
  @Input() public buttonClass: string = 'btn-primary';

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
   * The preferred placement of the dropdown, among the [possible values](#/guides/positioning#api).
   *
   * The default order of preference is `"bottom-start bottom-end top-start top-end"`
   */
  @Input() public placement: PlacementArray | undefined = undefined;

  /** If true, multiple items can be selected. */
  @Input() public multiple: boolean = false;

  public constructor() {
    super();
  }

  /**
   * This function is called when the user clicked a dropdown menu item.
   * @param item The data source item related to the clicked dropdown menu item.
   */
  protected onItemClicked(item: any): void {
    const itemValue: any = PEGlobalFunctions.evaluateValuePropertyName(this.valuePropertyName, item);

    if (this.multiple) {
      // Multiple selected values allowed => value is array
      if (this.value == undefined)
        this.value = [];
      else if (!Array.isArray(this.value))
        this.value = [this.value];

      // Has this item been selected before?
      const index: number = (this.value as any[]).indexOf(itemValue);
      if (index >= 0) {
        // Remove selection
        (this.value as any[]).splice(index, 1);
      } else {
        // Add selection
        (this.value as any[]).push(itemValue);
      }

    } else {
      // Single selected value
      this.value = itemValue;
    }

    this.emitValueChange(this.value);
  }

}
