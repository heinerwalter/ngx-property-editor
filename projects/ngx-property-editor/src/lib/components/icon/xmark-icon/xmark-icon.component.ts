import { Component, Input } from '@angular/core';
import { IconBaseComponent } from '../icon-base.component';
import { faCircleXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-xmark-icon',
  template: IconBaseComponent.iconComponentTemplate,
  styleUrls: ['../icon.component.scss'],
})
export class XMarkIconComponent extends IconBaseComponent {

  /** If true, the icon is displayed on a <button> element (without a visible button with border etc.). */
  @Input() override button: boolean = true;

  /** The FontAwesome icon to be displayed by the component. */
  override readonly icon: IconDefinition = faCircleXmark;

}
