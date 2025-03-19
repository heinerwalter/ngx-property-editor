import { Component, Input } from '@angular/core';
import { IconBaseComponent } from '../icon-base.component';

@Component({
  selector: 'pe-color-icon',
  template: IconBaseComponent.generateIconComponentTemplate(
    `<div [class]="class" [style]="style" title="{{ color || '' }}"></div>`),
  styleUrls: ['../icon.component.scss'],
})
export class ColorIconComponent extends IconBaseComponent {

  /** Color either as hexadecimal value (e.g. "#ff0000") or as bootstrap color class (e.g. "danger"). */
  @Input() public color: string | undefined = undefined;

  /** Returns true, if the `color` is a hexadecimal value (starting with "#"). */
  private get isHexColor(): boolean {
    return !!this.color?.startsWith('#');
  }

  protected get class(): string {
    return this.isHexColor ? '' : 'bg-' + this.color;
  }

  protected get style(): string {
    return 'display: inline-block; width: 1.2em; height: 1.2em; margin-bottom: -0.2em;' +
      (this.isHexColor ? ' background-color: ' + this.color : '');
  }

}
