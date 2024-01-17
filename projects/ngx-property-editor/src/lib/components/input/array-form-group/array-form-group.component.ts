import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormGroupComponent } from '../form-group/form-group.component';

@Component({
  selector: 'pe-array-form-group',
  templateUrl: './array-form-group.component.html',
  styleUrls: ['./array-form-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArrayFormGroupComponent extends FormGroupComponent {

  /**
   * Each row of this multi form group is represented by one item in this value array.
   * By adding the plus button, a new item is appended to the end of this array.
   * Whenever an item is added or removed, the `valueChange` event is triggered.
   */
  @Input() public value: any[] = [];

  /**
   * This event is triggered whenever an item is added to or removed from the `value` array.
   */
  @Output() public readonly valueChange: EventEmitter<any[]> = new EventEmitter<any[]>();


  /**
   * This template is used to display each item of the `value` array in a new row of this multi form group.
   * It received an item of the `value` array by the context variable `value` and
   * the item index by the context variable `index`.
   */
  @Input() public itemTemplate: TemplateRef<any> | undefined = undefined;

  /**
   * This function is called when the user requested a new item to be appended to the `value` array
   * by clicking the plus button. If this function is not defined, `undefined` is added as new item.
   */
  @Input() public newItemFunction: (() => any) | undefined = undefined;

  /**
   * If true, no delete button is displayed after the items.
   * The items can be changed but not deleted.
   */
  @Input() public disableDelete: boolean = false;

  /**
   * If true, no add button is displayed after the last item.
   */
  @Input() public disableAdd: boolean = false;

  protected getItemValueChangeFunction(index: number): ((itemValue: any) => void) {
    return (itemValue: any): void => {
      if (index < 0 || index >= this.value.length) return;
      this.value[index] = itemValue;
      this.valueChange.emit(this.value);
    };
  }

  public deleteItem(index: number): void {
    if (!this.value || index < 0 || index >= this.value.length) return;
    this.value.splice(index, 1);
    this.valueChange.emit(this.value);
  }

  public addItem(): void {
    if (!this.value) this.value = [];

    const newItem: any = this.newItemFunction ? this.newItemFunction() : undefined;
    this.value.push(newItem);
    this.valueChange.emit(this.value);
  }

  protected ngForTrackBy(index: number, item: any): boolean {
    return this.value && index < this.value.length && this.value[index] == item;
  }

}
