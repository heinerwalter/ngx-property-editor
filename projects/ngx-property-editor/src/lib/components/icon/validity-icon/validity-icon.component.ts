import { Component, Input } from '@angular/core';
import { IconBaseComponent } from '../icon-base.component';
import { faCircleCheck, faCircleMinus, faTriangleExclamation, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pe-validity-icon',
  template: IconBaseComponent.generateIconComponentTemplate(`<fa-icon *ngIf="isValid == true" [icon]="validIcon" class="text-success"></fa-icon>
  <fa-icon *ngIf="isValid == false" [icon]="invalidIcon" class="text-danger"></fa-icon>
  <fa-icon *ngIf="isValid == 'indeterminate'" [icon]="indeterminateIcon" class="text-muted"></fa-icon>`),
  styleUrls: ['../icon.component.scss'],
})
export class ValidityIconComponent extends IconBaseComponent {

  /**
   * If true, a check icon is displayed (valid).
   * If false, an exclamation mark icon is displayed (invalid).
   * If 'indeterminate', a minus icon is displayed (indeterminate).
   * If undefined, nothing is displayed.
   */
  @Input() public isValid: boolean | 'indeterminate' | undefined = undefined;

  /** The FontAwesome icon to be displayed, if `isValid == true`. */
  public readonly validIcon: IconDefinition = faCircleCheck;
  /** The FontAwesome icon to be displayed, if `isValid == false`. */ 
  public readonly invalidIcon: IconDefinition = faTriangleExclamation;
  /** The FontAwesome icon to be displayed, if `isValid == 'indeterminate'`. */ 
  public readonly indeterminateIcon: IconDefinition = faCircleMinus;

}
