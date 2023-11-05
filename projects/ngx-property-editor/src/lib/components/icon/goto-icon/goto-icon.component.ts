import { Component, Input } from '@angular/core';
import { CircleIconBaseComponent } from '../icon-base.component';
import { faCircleArrowRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-goto-icon',
  template: CircleIconBaseComponent.iconComponentTemplate,
  styleUrls: ['../icon.component.scss'],
})
export class GotoIconComponent extends CircleIconBaseComponent {

  /** If true, the icon is displayed on a <button> element (without a visible button with border etc.). */
  @Input() public override button: boolean = true;

  /** The FontAwesome icon to be displayed by the component. */
  public override readonly icon: IconDefinition = faCircleArrowRight;

}
