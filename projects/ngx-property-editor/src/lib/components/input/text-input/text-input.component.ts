import { Component, Input } from '@angular/core';
import { InputBaseWithValue } from '../input-base';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent extends InputBaseWithValue<string> {

  /** Defines the type of the HTML input element. Default: 'text'. */
  @Input() type:
    /** Defines a color picker. */
    'color' |
    /** Defines a field for an e-mail address. */
    'email' |
    /** Defines a password field. */
    'password' |
    /** Defines a text field for entering a search string. */
    'search' |
    /** Defines a field for entering a telephone number. */
    'tel' |
    /** Default. Defines a single-line text field. */
    'text' |
    /** Defines a field for entering a URL. */
    'url' = 'text';

  constructor() {
    super();
  }

}
