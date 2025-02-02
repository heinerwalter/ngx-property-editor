import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pe-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

  /** Additional CSS style of the login page container element (class `.login-page-container`). */
  @Input() public containerStyle: string | undefined = undefined;
  /** Additional CSS style of the login form container element (class `.login-form-container`). */
  @Input() public formStyle: string | undefined = undefined;

  /** Background color of the login page container element (class `.login-page-container`). */
  @Input() public containerBackgroundColor: string | undefined = '#eee';
  /** Background color of the login form container element (class `.login-form-container`). */
  @Input() public formBackgroundColor: string | undefined = '#fff';

  /** Label of the user name input element. */
  @Input() public labelUsername: string = 'Benutzername';
  /** Placeholder of the user name input element. */
  @Input() public placeholderUsername: string = 'Benutzername';

  /** Label of the password input element. */
  @Input() public labelPassword: string = 'Passwort';
  /** Placeholder of the password input element. */
  @Input() public placeholderPassword: string = 'Passwort';

  /** Label of the submit button. */
  @Input() public labelSubmit: string = 'Login';

  /** Predefined value of the user name input element. */
  @Input() public username: string | undefined = undefined;
  /** Predefined value of the password input element. */
  @Input() public password: string | undefined = undefined;

  /**
   * This event is emitted when the user changed the value of the user name input element.
   * The new value is passed as event argument.
   */
  @Output() public readonly usernameChange: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();
  /**
   * This event is emitted when the user changed the value of the password input element.
   * The new value is passed as event argument.
   */
  @Output() public readonly passwordChange: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();

  /**
   * This event is emitted when the user clicked on the submit button.
   */
  @Output() public readonly submitClick: EventEmitter<void> = new EventEmitter<void>();

}
