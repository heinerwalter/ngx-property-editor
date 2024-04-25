import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngb-btn-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonGroupComponent {

  /**
   * Bootstrap `.btn-group` class is assigned to the host element of this component
   * via this property and its host binding.
   */
  @HostBinding('class') protected readonly class: string = 'btn-group';

}
