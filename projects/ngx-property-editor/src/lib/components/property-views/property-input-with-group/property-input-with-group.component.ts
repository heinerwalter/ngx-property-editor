import { Component } from '@angular/core';
import { PropertyInputComponent } from '../property-input/property-input.component';

@Component({
  selector: 'pe-property-input-with-group',
  templateUrl: './property-input-with-group.component.html',
  styleUrls: ['./property-input-with-group.component.scss'],
})
export class PropertyInputWithGroupComponent extends PropertyInputComponent {

  /**
   * True, if a group of properties is displayed.
   */
  public get hasGroup(): boolean {
    return !!this.configuration && !!this.configuration.group?.length;
  }

}
