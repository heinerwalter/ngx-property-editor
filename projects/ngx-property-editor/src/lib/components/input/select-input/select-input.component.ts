import { Component, Input } from '@angular/core';
import { SelectInputBaseWithDataSource } from '../input-base';

@Component({
  selector: 'pe-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent extends SelectInputBaseWithDataSource<any> {

  /**
   * Optional: Add this class to the select element.
   */
  @Input() public selectClass: string | undefined = undefined;

  /**
   * Optional: If not empty, the property with this name is evaluated on the
   * data source items and the result is added as class attribute to the select
   * option elements.
   */
  @Input() public optionClassPropertyName: string | undefined = undefined;

  /**
   * If true, the string displayed on the select input element items
   * (see `displayPropertyName`) is interpreted as HTML. This way special
   * characters with `&...;` can be added to the displayed string.
   */
  @Input() public displayAsInnerHTML: boolean = false;

  public constructor() {
    super();
  }

}
