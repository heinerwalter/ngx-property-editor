import { Component } from '@angular/core';
import { CircleIconBaseComponent } from '../icon-base.component';
import { faCircleExclamation, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-exclamation-icon',
  template: CircleIconBaseComponent.iconComponentTemplate,
  styleUrls: ['../icon.component.scss'],
})
export class ExclamationIconComponent extends CircleIconBaseComponent {

  /** The FontAwesome icon to be displayed by the component. */
  public override readonly icon: IconDefinition = faCircleExclamation;

}
