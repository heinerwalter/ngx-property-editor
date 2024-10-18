import { Component, Input } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';

@Component({
  selector: 'pe-input-group-text',
  templateUrl: './input-group-text.component.html',
  styleUrls: ['./input-group-text.component.scss'],
})
export class InputGroupTextComponent {

  /** ID attribute of the HTML element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

}
