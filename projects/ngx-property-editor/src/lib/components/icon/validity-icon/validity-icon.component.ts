import { Component, Input } from '@angular/core';
import { IconBaseComponent } from '../icon-base.component';
import {
  faCircleCheck,
  faCircleInfo,
  faCircleMinus,
  faTriangleExclamation,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Available validity types for `ValidityIconComponent.validity`:
 * - `'valid'` or `'success'`: Green check icon.
 * - `'invalid'` or `'error'`: Red exclamation mark icon.
 * - `'warning'`:              Yellow exclamation mark icon.
 * - `'info'`:                 Blue "i" icon.
 * - `'indeterminate'`:        Grey minus icon.
 * If undefined, nothing is displayed.
 */
export type ValidityIconType =
  'valid' | 'success' |
  'invalid' | 'error' |
  'warning' |
  'info' |
  'indeterminate';

@Component({
  selector: 'pe-validity-icon',
  template: IconBaseComponent.generateIconComponentTemplate(
    `<fa-icon *ngIf="validity == 'valid' || validity == 'success'" [icon]="validIcon" class="text-success"></fa-icon>
    <fa-icon *ngIf="validity == 'invalid' || validity == 'error'" [icon]="invalidIcon" class="text-danger"></fa-icon>
    <fa-icon *ngIf="validity == 'warning'" [icon]="warningIcon" class="text-warning"></fa-icon>
    <fa-icon *ngIf="validity == 'info'" [icon]="infoIcon" class="text-info"></fa-icon>
    <fa-icon *ngIf="validity == 'indeterminate'" [icon]="indeterminateIcon" class="text-muted"></fa-icon>`),
  styleUrls: ['../icon.component.scss'],
})
export class ValidityIconComponent extends IconBaseComponent {

  /**
   * Validity icon type.
   * @see ValidityIconType
   */
  @Input() public validity: ValidityIconType | undefined = undefined;

  /** The FontAwesome icon to be displayed, if `validity == 'valid'`. */
  protected readonly validIcon: IconDefinition = faCircleCheck;
  /** The FontAwesome icon to be displayed, if `validity == 'invalid'`. */
  protected readonly invalidIcon: IconDefinition = faTriangleExclamation;
  /** The FontAwesome icon to be displayed, if `validity == 'warning'`. */
  protected readonly warningIcon: IconDefinition = faTriangleExclamation;
  /** The FontAwesome icon to be displayed, if `validity == 'info'`. */
  protected readonly infoIcon: IconDefinition = faCircleInfo;
  /** The FontAwesome icon to be displayed, if `validity == 'indeterminate'`. */
  protected readonly indeterminateIcon: IconDefinition = faCircleMinus;

}
