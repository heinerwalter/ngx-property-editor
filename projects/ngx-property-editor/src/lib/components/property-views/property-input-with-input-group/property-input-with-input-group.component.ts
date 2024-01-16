import { Component } from '@angular/core';
import { PropertyInputComponent } from '../property-input/property-input.component';

@Component({
  selector: 'pe-property-input-with-input-group',
  templateUrl: './property-input-with-input-group.component.html',
  styleUrls: ['./property-input-with-input-group.component.scss'],
})
export class PropertyInputWithInputGroupComponent extends PropertyInputComponent {

  /**
   * True, if an input group is displayed.
   */
  public get hasInputGroup(): boolean {
    return !!this.configuration && !!this.configuration.inputGroup?.length;
  }

  public get hasTwoDimensionalInputGroup(): boolean {
    return !!this.configuration && !!this.configuration.inputGroup?.length &&
      this.configuration.inputGroup?.length > 1;
  }

}
