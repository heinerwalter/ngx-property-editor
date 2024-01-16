import { Component, ViewEncapsulation, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'pe-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupComponent {

  /**
   * Should the input elements be displayed beside each other in a row (horizontal)
   * or below each other in a column (vertical).
   */
  @Input() public orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * True, if the `orientation` is `'horizontal'`.
   */
  @HostBinding('class.pe-input-group-horizontal')
  public get orientationIsHorizontal(): boolean {
    return this.orientation == 'horizontal';
  }

  /**
   * True, if the `orientation` is `'vertical'`.
   */
  @HostBinding('class.pe-input-group-vertical')
  public get orientationIsVertical(): boolean {
    return this.orientation == 'vertical';
  }

}
