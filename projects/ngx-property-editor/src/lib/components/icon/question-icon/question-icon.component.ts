import { Component } from '@angular/core';
import { IconBaseComponent } from '../icon-base.component';
import { faCircleQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-question-icon',
  template: IconBaseComponent.iconComponentTemplate,
  styleUrls: ['../icon.component.scss'],
})
export class QuestionIconComponent extends IconBaseComponent {

  /** The FontAwesome icon to be displayed by the component. */
  override readonly icon: IconDefinition = faCircleQuestion;

}
