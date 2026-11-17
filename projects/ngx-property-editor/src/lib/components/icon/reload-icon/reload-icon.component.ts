import { Component } from '@angular/core';
import { CircleIconBaseComponent } from '../icon-base.component';
import { faArrowRotateRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-reload-icon',
  template: CircleIconBaseComponent.iconComponentTemplate,
  styleUrls: ['../icon.component.scss'],
})
export class ReloadIconComponent extends CircleIconBaseComponent {

  /** The FontAwesome icon to be displayed by the component. */
  protected override readonly icon: IconDefinition = faArrowRotateRight;

}
