import { Component, Input } from '@angular/core';
import { Stringifier } from "ngx-property-editor";

@Component({
  selector: 'demo-input-demo-wrapper',
  templateUrl: './input-demo-wrapper.component.html',
  styleUrls: ['./input-demo-wrapper.component.scss']
})
export class InputDemoWrapperComponent {

  /**
   * Value of the input component to be displayed beside the input component.
   */
  @Input() public value: any | undefined = undefined;

  /**
   * Label displayed above the `value`.
   */
  @Input() public valueLabel: string = 'Value';

  @Input() public valueModifier: 'quotes' | undefined = undefined;

  public get valueAsString(): string {
    if (this.value == undefined) return 'undefined';

    const stringValue: string = Stringifier.anyTypeToString(this.value);

    switch (this.valueModifier) {
      case 'quotes':
        return `"${stringValue}"`;
    }
    return stringValue;
  }

}
