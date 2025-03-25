import { Component, Input } from '@angular/core';
import { SelectInputComponent } from '../select-input/select-input.component';

/**
 * This component displays a select input element (`SelectInputComponent`)
 * preceded by an icon element, which can be passed with selector `[icon]`
 * as child of this component.
 *
 * @example
 * <pe-select-input-with-icon [showIcon]="true" ...>
 *   <div icon>
 *     <!-- Insert the icon element here (<fa-icon ...> etc.) -->
 *   </div>
 * </pe-select-input-with-icon>
 *
 * @see SelectInputComponent
 */
@Component({
  selector: 'pe-select-input-with-icon',
  templateUrl: './select-input-with-icon.component.html',
  styleUrls: ['./select-input-with-icon.component.scss'],
})
export class SelectInputWithIconComponent extends SelectInputComponent {

  /**
   * If true (default), the icon element will be displayed.
   * The icon element can be passed with selector `[icon]` as child of this component.
   */
  @Input() public showIcon: boolean = true;

  public constructor() {
    super();
  }

}
