import { Component, HostBinding, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  template: '',
})
export abstract class IconBaseComponent {

  /** Show this tooltip on the icon. */
  @Input() public tooltip: string | undefined = undefined;

  /**
   * If true, the icon is displayed on a HTML <button> element
   * (without a visible button with border etc.).
   */
  @Input() public button: boolean = false;

  /**
   * Override the `tabindex` attribute of the HTML button or icon element
   * to change the order in which HTML elements are focused by the
   * Tab key.
   *
   * The default order of the HTML document is used, when `tabindex` is `0`.
   *
   * The button cannot be reached via the Tab key, when the
   * `tabindex` is negative. Alternatively, you can achieve this
   * by ssigning `true` to the `disableTabIndex` property.
   *
   * The default value of this property is `undefined`.
   * In that case the `tabindex` attribute value depends on whether
   * the icon is displayed using a HTML <button> or <i> element.
   * The default value for a <button> element is 0 (default tab order).
   * The default value for an <i> element is -1 (not reachable via Tab key).
   */
  @Input() public tabindex: number | undefined = undefined;

  /**
   * If true, left padding is added to the icon.
   * This is necessary, if the icon is added immediately after another element.
   */
  @Input() public paddingLeft: boolean = false;
  /**
   * If true, right padding is added to the icon.
   * This is necessary, if the icon is added immediately before another element.
   */
  @Input() public paddingRight: boolean = false;

  /**
   * Generates the component template for all icon components (inheriting from `IconBaseComponent`).
   * @param iconContent Template code displaying the actual icon.
   *                    Example: '<fa-icon [icon]="icon"></fa-icon>'
   */
  public static generateIconComponentTemplate(iconContent: string): string {
    return `
<button *ngIf="button"
        class="icon-btn"
        [class.icon-padding-left]="paddingLeft"
        [class.icon-padding-right]="paddingRight"
        [ngbTooltip]="tooltip || ''"
        [attr.tabindex]="tabindex ?? 0">
  <ng-container *ngTemplateOutlet="iconTemplate"></ng-container>
</button>

<i *ngIf="!button"
   class="icon"
   [class.icon-padding-left]="paddingLeft"
   [class.icon-padding-right]="paddingRight"
   [ngbTooltip]="tooltip || ''"
   [attr.tabindex]="tabindex ?? -1">
  <ng-container *ngTemplateOutlet="iconTemplate"></ng-container>
</i>

<ng-template #iconTemplate>
  ${iconContent}
</ng-template>
`;
  }

}

@Component({
  template: '',
})
export abstract class CircleIconBaseComponent extends IconBaseComponent {

  /** Add class 'circle-icon' to the icon component host element. */
  @HostBinding('class.circle-icon') public readonly circleIconClass: boolean = true;

  /** The FontAwesome icon to be displayed by the component. */
  protected abstract readonly icon: IconDefinition;

  /**
   * The component template for all circle icon components (inheriting from `CircleIconBaseComponent`)
   * with an `icon` property.
   */
  protected static readonly iconComponentTemplate: string =
    IconBaseComponent.generateIconComponentTemplate('<fa-icon [icon]="icon"></fa-icon>');

}
