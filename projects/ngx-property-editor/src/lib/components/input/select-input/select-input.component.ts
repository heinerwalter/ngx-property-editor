import { Component, Input } from '@angular/core';
import { InputBaseWithValueAndDataSource } from '../input-base';

@Component({
  selector: 'pe-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent extends InputBaseWithValueAndDataSource<any | any[]> {

  /** If true, multiple items can be selected. */
  @Input() public multiple: boolean = false;

  /** If true, an additional empty item is added to enable empty selection (`value == undefined`). */
  @Input() public allowEmpty: boolean = false;

  public constructor() {
    super();
  }

}
