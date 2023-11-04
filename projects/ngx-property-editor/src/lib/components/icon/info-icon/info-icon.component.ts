import { Component } from '@angular/core';
import { IconBaseComponent } from '../icon-base.component';
import { faCircleInfo, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-info-icon',
  template: IconBaseComponent.iconComponentTemplate,
  styleUrls: ['../icon.component.scss'],
})
export class InfoIconComponent extends IconBaseComponent {

  /** The FontAwesome icon to be displayed by the component. */
  override readonly icon: IconDefinition = faCircleInfo;

}
