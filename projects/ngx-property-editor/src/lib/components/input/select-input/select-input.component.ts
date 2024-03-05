import { Component, Input, TemplateRef } from '@angular/core';
import { InputBaseWithValueAndDataSource } from '../input-base';

@Component({
  selector: 'pe-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent extends InputBaseWithValueAndDataSource<any | any[]> {

  /** If true, multiple items can be selected. */
  @Input() public multiple: boolean = false;

  /** If true, an additional empty item is added to enable empty selection (`value == undefined`). */
  @Input() public allowEmpty: boolean = false;

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
   * Optional: Reference to an option content template.
   * If defined this template is used to fill the select option elements with content.
   * Two parameters are passed as template context:
   * - `item`: The data source item object.
   * - `label`: The text which is usually displayed on the option element.
   *            The label is the result of evaluating the `displayPropertyName` on the data source item.
   */
  @Input() public optionTemplate: TemplateRef<any> | undefined = undefined;

  public constructor() {
    super();
  }

}
