import { Component } from '@angular/core';
import { IconBaseComponent } from '../icon-base.component';
import { faCircleExclamation, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-exclamation-icon',
  template: IconBaseComponent.iconComponentTemplate,
  styleUrls: ['../icon.component.scss'],
})
export class ExclamationIconComponent extends IconBaseComponent {

  /** The FontAwesome icon to be displayed by the component. */
  override readonly icon: IconDefinition = faCircleExclamation;

}
