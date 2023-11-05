import { Component, Input } from '@angular/core';
import { CircleIconBaseComponent } from '../icon-base.component';
import { faCircleMinus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-minus-icon',
  template: CircleIconBaseComponent.iconComponentTemplate,
  styleUrls: ['../icon.component.scss'],
})
export class MinusIconComponent extends CircleIconBaseComponent {

  /** The FontAwesome icon to be displayed by the component. */
  public override readonly icon: IconDefinition = faCircleMinus;

}
