import { Component, HostBinding, Input } from '@angular/core';

@Component({
  template: '',
})
export abstract class IconBaseComponent {

  /** Show this tooltip on the icon. */
  @Input() tooltip: string | undefined = undefined;

  /** Add class 'circle-icon' to the icon component host element. */
  @HostBinding('class.circle-icon') readonly circleIconClass: boolean = true;

}
