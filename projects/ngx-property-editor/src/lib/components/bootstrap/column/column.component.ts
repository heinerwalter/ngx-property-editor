import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ngb-col',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnChanges {

  /**
   * Bootstrap column width on md wide screens (class "col-md-...").
   */
  @Input() md: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined = undefined;

  /**
   * Bootstrap "col-..." classes are assigned to the host element of this component
   * via this property and its host binding.
   */
  @HostBinding('class') class: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('md'))
      this.updateClass();
  }

  /**
   * Update the class property and thereby the class attribute of the host element of this component.
   */
  private updateClass(): void {
    this.class = this.md == undefined ? 'col' : `col-md-${ this.md }`;
  }

}
