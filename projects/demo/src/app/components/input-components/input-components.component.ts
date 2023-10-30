import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'demo-input-components',
  templateUrl: './input-components.component.html',
  styleUrls: ['./input-components.component.scss']
})
export class InputComponentsComponent {

  /**
   * The content of this array is displayed as lines in the terminal component.
   * Whenever the value of an input component has been changed by the user,
   * a new line is added containing the input component name and the changed value.
   */
  @Input() public terminalLines: string[] = [];
  @Output() public readonly terminalLinesChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  /**
   * Data source for all input components which need a data source.
   */
  public readonly inputDataSource = [
    { name: 'Item 1', value: 'item 1' },
    { name: 'Item 2', value: 'item 2' },
    { name: 'Item 3', value: 'item 3' },
    { name: 'Item 4', value: 'item 4' },
    { name: 'Item 5', value: 'item 5' },
  ];

  /**
   * This method is called when the user changed the value of any input component.
   * @param inputName Name of the input component.
   * @param value changed value.
   */
  public onInputValueChange(inputName: string, value: any): void {
    let valueString: string;
    if (value == undefined)
      valueString = 'undefined';
    else if (Array.isArray(value))
      valueString = `[${value.join(', ')}]`;
    else
      valueString = value.toString();

    this.terminalLines.push(`value of ${inputName} input changed: ${valueString}`);
    this.terminalLinesChange.emit(this.terminalLines);
  }

}
