import { Component, Input } from '@angular/core';
import { InputBaseWithValue } from '../input-base';

@Component({
  selector: 'pe-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent extends InputBaseWithValue<string> {

  /** Defines the type of the HTML input element. Default: 'text'. */
  @Input() public type:
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

  /**
   * If true, the entered text is automatically trimmed after each change event (enter or focus left).
   */
  @Input() public trimValue: boolean = false;

  /**
   * If defined and not empty, a list with recommendations is displayed (similar to the select input)
   * that can be used to fill the text input.
   */
  @Input() public autocompleteList: string[] | undefined = undefined;

  public constructor() {
    super();
  }

  /**
   * Triggered by the input element change event (enter or focus left).
   */
  protected onChange(): void {
    // Trim value after change
    if (this.trimValue) {
      const value: string | undefined = this.value?.trim();
      if (value == this.value) return;
      this.value = value;
      this.emitValueChange(value);
    }
  }

}
