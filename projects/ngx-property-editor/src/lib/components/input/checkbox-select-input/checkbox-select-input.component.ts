import { Component, Input } from '@angular/core';
import { InputBaseWithValueAndDataSource } from '../input-base';

@Component({
  selector: 'npe-checkbox-select-input',
  templateUrl: './checkbox-select-input.component.html',
  styleUrls: ['./checkbox-select-input.component.scss'],
})
export class CheckboxSelectInputComponent extends InputBaseWithValueAndDataSource<any[]> {

  @Input() showSelectAll: boolean = false;

  constructor() {
    super();
  }

  onItemValueChanged(item: any, newSelectionValue: boolean) {
    const itemValue: any = this.evaluateValuePropertyName(item);

    if (!Array.isArray(this.value))
      this.value = [];

    const index: number = this.value?.indexOf(itemValue);
    if (newSelectionValue) {
      if (index < 0)
        this.value.push(itemValue);
    } else {
      if (index >= 0)
        this.value?.splice(index, 1);
    }

    this.emitValueChange(this.value);
  }

  onSelectAllClicked(newSelectionValue: boolean) {
    if (newSelectionValue == true) {
      this.value = this.dataSource?.map(item => this.evaluateValuePropertyName(item));
      this.emitValueChange(this.value);
    } else if (newSelectionValue == false) {
      this.value = [];
      this.emitValueChange(this.value);
    }
  }

}
