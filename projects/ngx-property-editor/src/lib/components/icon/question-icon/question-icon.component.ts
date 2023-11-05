import { Component } from '@angular/core';
import { CircleIconBaseComponent } from '../icon-base.component';
import { faCircleQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-question-icon',
  template: CircleIconBaseComponent.iconComponentTemplate,
  styleUrls: ['../icon.component.scss'],
})
export class QuestionIconComponent extends CircleIconBaseComponent {

  /** The FontAwesome icon to be displayed by the component. */
  public override readonly icon: IconDefinition = faCircleQuestion;

}
