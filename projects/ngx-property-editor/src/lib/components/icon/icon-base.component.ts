import { Component, HostBinding, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  template: '',
})
export abstract class IconBaseComponent {

  /** Show this tooltip on the icon. */
  @Input() tooltip: string | undefined = undefined;

  /** If true, the icon is displayed on a <button> element (without a visible button with border etc.). */
  @Input() button: boolean = false;

  /**
   * If true, left padding is added to the icon.
   * This is necessary, if the icon is added immediately after another element.
   */
  @Input() paddingLeft: boolean = false;
  /**
   * If true, right padding is added to the icon.
   * This is necessary, if the icon is added immediately before another element.
   */
  @Input() paddingRight: boolean = false;

  /** Add class 'circle-icon' to the icon component host element. */
  @HostBinding('class.circle-icon') readonly circleIconClass: boolean = true;

  /** The FontAwesome icon to be displayed by the component. */
  abstract readonly icon: IconDefinition;

  /**
   * The component template for all icon components (inheriting from `IconBaseComponent`).
   */
  public static readonly iconComponentTemplate: string = `
<button *ngIf="button"
        class="icon-btn"
        [class.circle-icon-padding-left]="paddingLeft"
        [class.circle-icon-padding-right]="paddingRight"
        [ngbTooltip]="tooltip || ''">
  <ng-container *ngTemplateOutlet="iconTemplate"></ng-container>
</button>

<i *ngIf="!button"
   [class.circle-icon-padding-left]="paddingLeft"
   [class.circle-icon-padding-right]="paddingRight"
   [ngbTooltip]="tooltip || ''">
  <ng-container *ngTemplateOutlet="iconTemplate"></ng-container>
</i>

<ng-template #iconTemplate>
  <fa-icon [icon]="icon"></fa-icon>
</ng-template>
`;

}
