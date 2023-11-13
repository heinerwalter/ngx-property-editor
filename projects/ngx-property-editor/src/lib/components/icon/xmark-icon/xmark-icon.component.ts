import { Component, Input } from '@angular/core';
import { CircleIconBaseComponent } from '../icon-base.component';
import { faCircleXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-xmark-icon',
  template: CircleIconBaseComponent.iconComponentTemplate,
  styleUrls: ['../icon.component.scss'],
})
export class XMarkIconComponent extends CircleIconBaseComponent {

  /** The FontAwesome icon to be displayed by the component. */
  protected override readonly icon: IconDefinition = faCircleXmark;

}
