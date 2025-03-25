import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PropertyTableColumn } from '../property-table-column';
import { PEGlobalFunctions } from '../../../controller/pe-global-functions';
import { MovableModalComponent } from '../../modal/movable-modal/movable-modal.component';

@Component({
  selector: 'pe-table-column-chooser',
  templateUrl: './table-column-chooser.component.html',
  styleUrls: ['./table-column-chooser.component.scss'],
})
export class TableColumnChooserComponent implements OnInit, OnChanges {

  /** ID of the column chooser element. */
  @Input() public id: string = PEGlobalFunctions.generateRandomId();

  /**
   * If true, the column chooser is visible.
   * By default, it is invisible (false).
   */
  @Input() public isVisible: boolean = false;

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

  /** Reference of the modal window component. */
  @ViewChild(MovableModalComponent, { static: true }) protected modalComponent?: MovableModalComponent;

  public constructor() {
  }

  public ngOnInit(): void {
    this.modalComponent?.toggleVisibility(this.isVisible);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('isVisible')) {
      this.modalComponent?.toggleVisibility(this.isVisible);
    }
  }

}
