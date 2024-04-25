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
  @Input() public md: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined = 12;

  /**
   * Bootstrap "col-..." classes are assigned to the host element of this component
   * via this property and its host binding.
   */
  @HostBinding('class') public class: string = 'col';

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('md')) {
      this.updateClass();
    }
  }

  /**
   * Update the class property and thereby the class attribute of the host element of this component.
   */
  private updateClass(): void {
    this.class = `col-md-${this.md || 12}`;
  }

}
