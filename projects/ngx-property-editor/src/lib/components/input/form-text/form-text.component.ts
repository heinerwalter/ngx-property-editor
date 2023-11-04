import { Component, Input } from '@angular/core';
import { PEGlobalFunctions } from '../../../global-functions';

@Component({
  selector: 'pe-form-text',
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.scss']
})
export class FormTextComponent {

  /** ID attribute of the form text element. */
  @Input() id: string = PEGlobalFunctions.generateRandomId();

}
