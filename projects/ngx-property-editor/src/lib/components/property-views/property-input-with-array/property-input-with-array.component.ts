import { Component } from '@angular/core';
import { PropertyInputComponent } from '../property-input/property-input.component';

@Component({
  selector: 'pe-property-input-with-array',
  templateUrl: './property-input-with-array.component.html',
  styleUrls: ['./property-input-with-array.component.scss'],
})
export class PropertyInputWithArrayComponent extends PropertyInputComponent {

  /**
   * True, if an array of property inputs is displayed.
   */
  public get hasArray(): boolean {
    return !!this.configuration && this.configuration.isArray &&
      (!this.configuration.hasGroup || this.configuration.propertyType != 'select');
  }

}
