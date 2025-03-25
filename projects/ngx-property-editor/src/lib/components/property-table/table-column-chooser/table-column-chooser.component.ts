import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PropertyTableColumn } from '../property-table-column';

@Component({
  selector: 'pe-table-column-chooser',
  templateUrl: './table-column-chooser.component.html',
  styleUrls: ['./table-column-chooser.component.scss'],
})
export class TableColumnChooserComponent {

  /**
   * All columns of a `PropertyTableComponent` (visible and invisible)
   * including it´s property configurations and parent columns.
   */
  @Input() public columns: PropertyTableColumn[] = [];

  /**
   * This event is emitted when the visibility of one or multiple columns has changed.
   * All changed columns are passed as event argument.
   */
  @Output() public readonly visibleColumnsChanged: EventEmitter<PropertyTableColumn[]> = new EventEmitter<PropertyTableColumn[]>();

  public constructor() {
  }

}
