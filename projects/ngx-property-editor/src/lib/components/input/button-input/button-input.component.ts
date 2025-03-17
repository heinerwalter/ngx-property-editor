import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputBase } from '../input-base';

@Component({
  selector: 'pe-button-input',
  templateUrl: './button-input.component.html',
  styleUrls: ['./button-input.component.scss'],
})
export class ButtonInputComponent extends InputBase {

  /** Button tooltip text. */
  @Input() public tooltip: string | undefined = undefined;

  /** Click event of the button. */
  @Output() public readonly buttonClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  public constructor() {
    super();
  }

  /**
   * Triggered when the button was clicked.
   */
  protected onButtonClick(event: MouseEvent): void {
    this.buttonClick.emit(event);
  }

}
