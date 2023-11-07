import { Component, Input } from '@angular/core';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';

@Component({
  selector: 'pe-form-text',
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.scss']
})
export class FormTextComponent {

  /** ID attribute of the form text element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

}
