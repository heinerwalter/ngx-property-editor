import { Component } from '@angular/core';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  /**
   * The content of this array is displayed as lines in the terminal component.
   * Whenever the value of an input component has been changed by the user,
   * a new line is added containing the input component name and the changed value.
   */
  public terminalLines: string[] = [
    'Welcome to the ngx-property-editor Demo!',
    'Change the value of any input field above to see the result here.',
  ];

  /** Limit displayed lines to this number (show newest/last lines). */
  public terminalMaxLines: number = 20;

}
