import { Component } from '@angular/core';
import { CircleIconBaseComponent } from '../icon-base.component';
import { faCircleInfo, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-info-icon',
  template: CircleIconBaseComponent.iconComponentTemplate,
  styleUrls: ['../icon.component.scss'],
})
export class InfoIconComponent extends CircleIconBaseComponent {

  /** The FontAwesome icon to be displayed by the component. */
  protected override readonly icon: IconDefinition = faCircleInfo;

}
