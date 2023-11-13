import { Component, Input } from '@angular/core';
import { CircleIconBaseComponent } from '../icon-base.component';
import { faCirclePlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-plus-icon',
  template: CircleIconBaseComponent.iconComponentTemplate,
  styleUrls: ['../icon.component.scss'],
})
export class PlusIconComponent extends CircleIconBaseComponent {

  /** The FontAwesome icon to be displayed by the component. */
  protected override readonly icon: IconDefinition = faCirclePlus;

}
